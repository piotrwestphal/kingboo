provider "google" {
  project = var.project
  region  = var.region
  zone    = var.zone
}

resource "tls_private_key" "provisioner_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "google_compute_network" "vpc-network" {
  name                    = "vm-kingboo-network"
  auto_create_subnetworks = true
}

resource "google_compute_firewall" "ssh-rule" {
  name    = "allow-ssh"
  network = google_compute_network.vpc-network.name
  allow {
    protocol = "tcp"
    ports = [
      "22"
    ]
  }
  source_ranges = [
    "0.0.0.0/0"
  ]
  target_tags = [
    "externalssh"
  ]
}

resource "google_compute_instance" "vm-instance" {
  name                      = var.vm_name
  labels                    = {}
  machine_type              = "e2-micro"
  resource_policies         = []
  allow_stopping_for_update = true
  tags = [
    "externalssh"
  ]

  boot_disk {
    initialize_params {
      image = "centos-7"
    }
  }

  network_interface {
    network = google_compute_network.vpc-network.self_link
    access_config {
      network_tier = "STANDARD" # after tf update it changes to PREMIUM because it holds an static ip address ref
    }
  }

  service_account {
    email = var.gservice_email
    scopes = [
      "compute-ro"
    ]
  }

  metadata = {
    ssh-keys = join("\n", [
      "gcp-provisioner:${tls_private_key.provisioner_key.public_key_openssh}",
      "${var.github-service_name}:${var.github-service_pub_key}",
    ])
  }

  provisioner "remote-exec" {

    connection {
      host        = self.network_interface[0].access_config[0].nat_ip
      type        = "ssh"
      user        = "gcp-provisioner"
      private_key = tls_private_key.provisioner_key.private_key_pem
    }

    // TODO: https://computingforgeeks.com/how-to-install-latest-docker-compose-on-linux/
    inline = [
      "sudo yum install -y yum-utils",
      "sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo",
      "sudo yum install -y docker-ce docker-ce-cli containerd.io",
      "sudo systemctl enable --now docker",
      "sudo curl -L 'https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)' -o /usr/bin/docker-compose",
      "sudo chmod +x /usr/bin/docker-compose",
      "sudo yum install -y git",
      "sudo usermod -aG docker ${var.github-service_name}",
      "sudo mkdir /home/${var.github-service_name}/app",
      "sudo git clone https://github.com/piotrwestphal/kingboo.git /home/${var.github-service_name}/app",
      "sudo chown -R ${var.github-service_name} /home/${var.github-service_name}"
    ]
  }

  depends_on = [
    google_compute_firewall.ssh-rule,
    tls_private_key.provisioner_key
  ]
}
