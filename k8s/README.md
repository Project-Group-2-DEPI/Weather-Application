## ☸️ Container Orchestration with Kubernetes

Kubernetes is used to orchestrate and manage the containers running the Weather App components. It ensures high availability, scalability, and simplified management across services.

### ✅ Features & Benefits:

- **Service Segmentation:**  
  Separate deployments for UI, Weather API, and Authentication ensure modular design and independent scaling.

- **Secrets & Config Management:**  
  Uses `Secrets` and `ConfigMaps` to securely handle sensitive data like API keys and database credentials.

- **Persistent Storage:**  
  MySQL is deployed using a `StatefulSet` to ensure stable storage with persistent volume claims.

- **Load Balancing:**  
  Kubernetes `Services` expose the deployments and distribute traffic evenly across pods.

- **Declarative Configuration:**  
  All resources are defined in YAML files for easy versioning, reusability, and automation.

- **Resilience & Auto-healing:**  
  Failed pods are automatically restarted, and services remain available via self-healing capabilities.

---

### 📁 Kubernetes Directory Structure

```text
k8s/
├── auth/
│   ├── weatherauth-deployment.yaml       # Deployment for Auth service
│   ├── weatherauth-service.yaml          # ClusterIP Service for Auth
│   └── mysql/
│       ├── mysql-config.yaml             # ConfigMap for DB settings
│       ├── mysql-secret.yaml             # Secret for DB credentials
│       ├── mysql-service.yaml            # MySQL Service
│       └── mysql-stateful.yaml           # StatefulSet for MySQL
├── ui/
│   ├── weatherui-deployment.yaml         # Deployment for UI
│   └── weatherui-service.yaml            # Service for UI
└── weather/
    ├── weather-deployment.yaml           # Deployment for Weather API
    ├── weather-secret.yaml               # Secret for API key
    └── weather-service.yaml              # Service for Weather API
```
