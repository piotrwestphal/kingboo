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
  machine_type              = "e2-micro"
  allow_stopping_for_update = true
  tags = [
    "externalssh"
  ]

  boot_disk {
    initialize_params {
      image = "centos-8"
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

    inline = [
      // install dependencies
      "sudo yum install -y yum-utils",
      "sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo",
      "sudo yum install -y docker-ce docker-ce-cli containerd.io",
      "sudo curl -L 'https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)' -o /usr/bin/docker-compose",
      "sudo yum install -y git",
      "sudo mkdir /home/${var.github-service_name}/app",
      "sudo git clone https://github.com/piotrwestphal/kingboo.git /home/${var.github-service_name}/app",
      // prepare and run docker
      "sudo chmod +x /usr/bin/docker-compose",
      "sudo usermod -aG docker ${var.github-service_name}",
      "sudo systemctl start docker",
    ]
  }

  // allow ssh https://stackoverflow.com/questions/62231372/allow-ssh-access-to-gcp-vm-instances-provisioned-with-terraform
  depends_on = [
    google_compute_firewall.ssh-rule,
    tls_private_key.provisioner_key
  ]
}
