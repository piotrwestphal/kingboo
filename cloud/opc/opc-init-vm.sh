#!/bin/bash
# Install dependencies
yum install -y yum-utils
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

yum install -y docker-ce docker-ce-cli containerd.io
systemctl start docker
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
chmod +x /usr/bin/docker-compose
yum install -y git

# Security rules
firewall-cmd --permanent --add-port=8080/tcp

# Prepare repository
adduser github-service
usermod -aG docker github-service
mkdir /home/github-service/app
git clone https://github.com/piotrwestphal/kingboo.git /home/github-service/app
mkdir /home/github-service/.ssh
touch /home/github-service/.ssh/authorized_keys
echo 'GITHUB_SERVICE_KEY_HERE' >> /home/github-service/.ssh/authorized_keys
chown -R github-service /home/github-service
