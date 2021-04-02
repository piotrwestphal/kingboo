#!/bin/bash
# Install dependencies
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

yum install -y docker-ce docker-ce-cli containerd.io
systemctl start docker
curl -L "https://github.com/docker/compose/releases/download/1.28.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
chmod +x /usr/bin/docker-compose
yum install -y git

# Install filebeat
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-oss-7.12.0-x86_64.rpm
yum localinstall -y filebeat-oss-7.12.0-x86_64.rpm

# Security rules
firewall-cmd --permanent --add-port=8080/tcp

# Prepare repository
adduser github-service
usermod -aG docker github-service
mkdir /home/github-service/app
git clone https://github.com/piotrwestphal/taruka.git /home/github-service/app
mkdir /home/github-service/.ssh
touch /home/github-service/.ssh/authorized_keys
echo 'GITHUB_SERVICE_KEY_HERE' >> /home/github-service/.ssh/authorized_keys
chown -R github-service /home/github-service

# Filebeat config
/bin/cp -f /home/github-service/app/cloud/opc/filebeat.yml /etc/filebeat/
systemctl enable filebeat
systemctl restart filebeat
