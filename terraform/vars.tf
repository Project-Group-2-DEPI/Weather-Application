# AWS credentials
variable "aws_access_key" {
  type        = string
  sensitive   = true
}

variable "aws_secret_key" {
  type        = string
  sensitive   = true
}

# VPC
variable "vpc_cidr" {}
variable "public_subnet_cidr" {}
variable "vpc_name" {}

# EC2
variable "ami_id" {}
variable "instance_type" {}
variable "key_name" {}
variable "public_key" {
  type        = string
  sensitive   = true
}
