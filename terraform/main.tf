module "vpc" {
  source             = "./modules/vpc"
  vpc_cidr           = var.vpc_cidr
  public_subnet_cidr = var.public_subnet_cidr
  vpc_name           = var.vpc_name
}

module "ec2" {
  source        = "./modules/ec2"
  ami_id        = var.ami_id
  instance_type = var.instance_type
  subnet_id     = module.vpc.subnet_id
  vpc_id        = module.vpc.vpc_id
  key_name      = var.key_name
  public_key    =var.public_key 
}


terraform {
  backend "s3" {
    bucket = "tfstate-ali"
    key    = "weather-app/terraform/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}

