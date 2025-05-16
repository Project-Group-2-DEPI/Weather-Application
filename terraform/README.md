
## 📦 Infrastructure as Code with Terraform

Terraform is used in this project to automate and manage the AWS infrastructure provisioning process. It provides a declarative way to define and deploy cloud resources, improving efficiency, repeatability, and scalability.

### ✅ Features & Benefits:

- **Modular Design:**  
  Infrastructure is broken down into reusable modules like `VPC`, `EC2`, and `Security Groups` for better organization and scalability.

- **Automated Provisioning:**  
  Resources such as VPC, public subnets, EC2 instances, S3 buckets, and security groups are provisioned automatically.

- **Environment Management:**  
  Variables and state files allow easy deployment across different environments (e.g., dev, staging, production).

- **Version Control:**  
  Infrastructure is stored as code in Git, allowing for easy tracking of changes and collaboration.

- **Scalability & Reusability:**  
  New infrastructure can be spun up quickly by reusing modules or updating variables.

- **State Management:**  
  Tracks deployed resources in `terraform.tfstate` to manage lifecycle (create, update, delete) accurately.

### 🔧 AWS Resources Managed:

- VPC and Public Subnet
- EC2 Instance with SSH Key Access
- S3 Bucket for storage
- Security Groups for access control

---

## 📂 Terraform Structure

```plaintext
terraform/
    ├── id_rsa.pub
    ├── main.tf
    ├── outputs.tf
    ├── provider.tf
    ├── terraform.tfstate
    ├── terraform.tfstate.backup
    ├── terraform.tfvars
    ├── vars.tf
    └── modules/
        ├── ec2/
        │   ├── main.tf
        │   ├── outputs.tf
        │   └── variables.tf
        └── vpc/
            ├── main.tf
            ├── outputs.tf
            └── variables.tf

```
