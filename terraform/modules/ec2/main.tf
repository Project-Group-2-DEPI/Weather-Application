resource "aws_security_group" "ec2_sg" {
  vpc_id = var.vpc_id
  name   = "weather-ec2-sg"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "weather_ec2" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true
  key_name                    = var.key_name

  user_data = <<-EOF
              #!/bin/bash
              useradd master
              echo "master ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
              mkdir -p /home/master/.ssh
              echo "${var.public_key}" > /home/master/.ssh/authorized_keys
              chown -R master:master /home/master/.ssh
              chmod 700 /home/master/.ssh
              chmod 600 /home/master/.ssh/authorized_keys
              EOF

  tags = {
    Name = "weather-app-instance"
  }
}

