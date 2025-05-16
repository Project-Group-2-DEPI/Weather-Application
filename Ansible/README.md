# 🚀 Ansible Playbook for Installing Docker and Jenkins

This Ansible playbook automates the installation of **Docker** and **Jenkins** on both **Ubuntu** and **RedHat-based** systems.

---

## 📌 Requirements

### 🔹 Control Node:
- Ansible installed (`ansible` command available).
- SSH access to the target machines.

### 🔹 Managed Nodes (Target Machines):
- **OS:** Ubuntu or RedHat-based distributions (CentOS, RHEL, Rocky Linux).
- Sudo privileges enabled.

---

## 📌 Features

✅ **Automated Installation** – Installs Docker and Jenkins with a single command.  
✅ **OS Detection** – Supports **Ubuntu** and **RedHat-based** distributions.  
✅ **Dependency Management** – Installs required dependencies before proceeding.  
✅ **Repository Setup** – Adds official Docker and Jenkins repositories.  
✅ **Service Management** – Ensures Docker and Jenkins are enabled and running.  
✅ **Secure Execution** – Uses `sudo` for privileged tasks with `--ask-become-pass`.  
✅ **Modular Roles** – Organized using **Ansible roles** for maintainability.  
✅ **Idempotency** – Only changes what’s necessary, avoiding redundant installations.  

---

## 📂 Playbook Structure

```plaintext
 Ansible/
    ├── ansible.cfg
    ├── inventory
    ├── main.yml
    ├── README.md
    ├── terraform.tfstate
    └── roles/
        ├── Install-Docker/
        │   ├── defaults/
        │   │   └── main.yml
        │   ├── handlers/
        │   │   └── main.yml
        │   ├── meta/
        │   │   └── main.yml
        │   ├── tasks/
        │   │   └── main.yml
        │   ├── tests/
        │   │   ├── inventory
        │   │   └── test.yml
        │   ├── vars/
        │   │   └── main.yml
        │   └── README.md
        ├── Install-Jenkins/
        │   ├── defaults/
        │   │   └── main.yml
        │   ├── handlers/
        │   │   └── main.yml
        │   ├── meta/
        │   │   └── main.yml
        │   ├── tasks/
        │   │   └── main.yml
        │   ├── tests/
        │   │   ├── inventory
        │   │   └── test.yml
        │   ├── vars/
        │   │   └── main.yml
        │   └── README.md
        └── run-weatherapp/
            ├── defaults/
            │   └── main.yml
            ├── handlers/
            │   └── main.yml
            ├── meta/
            │   └── main.yml
            ├── tasks/
            │   └── main.yml
            ├── tests/
            │   ├── inventory
            │   └── test.yml
            ├── vars/
            │   └── main.yml
            └── README.md

```
---
## Run Playbook 
```sh
  $ ansible-playbook main.yml --ask-become-pass
```
---

## 🎯 Conclusion

This playbook simplifies the setup of **Docker** and **Jenkins** using **Ansible**, making deployments **faster** and **more reliable**. 🚀  
With just a single command, you can automate the installation and configuration across multiple systems effortlessly.  


