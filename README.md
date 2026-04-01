# Healthcare CI/CD Lab — MediTrack Patient Appointment System

A real-world CI/CD pipeline built around MediTrack, a patient appointment management API. The pipeline automates testing, Docker image publishing, and Kubernetes deployment to AWS EKS.

## Tech Stack
- Node.js / Express
- Jest & ESLint
- Docker & DockerHub
- AWS EKS
- GitHub Actions
- Prometheus

## Architecture
- **MediTrack API** — Patient registration and appointment scheduling
- **Docker Image** — Multi-stage build with non-root user and health check
- **Kubernetes** — 3 replicas with liveness/readiness probes and resource limits
- **Prometheus Metrics** — Request count, duration, and appointment counters

## CI/CD Pipeline
3-stage GitHub Actions pipeline triggered on every push to main:

| Stage | What It Does |
|---|---|
| Test | ESLint + Jest tests with coverage |
| Build & Push | Builds Docker image, pushes to DockerHub |
| Deploy | Applies K8s manifests, updates image, waits for rollout |

## GitHub Secrets Required
| Secret | Description |
|---|---|
| `DOCKER_USERNAME` | DockerHub username |
| `DOCKER_PASSWORD` | DockerHub password |
| `AWS_ACCESS_KEY_ID` | IAM user access key |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret key |

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Health check |
| GET | /metrics | Prometheus metrics |
| GET | /api/patients | List all patients |
| POST | /api/patients | Register a patient |
| GET | /api/appointments | List appointments |
| POST | /api/appointments | Schedule an appointment |
| DELETE | /api/appointments/:id | Cancel an appointment |

## Setup
1. Provision EKS cluster using cloud-migration-infra
2. Add GitHub secrets
3. Push to main — pipeline triggers automatically

## Cleanup
```bash
kubectl delete -f kubernetes/service.yaml
kubectl delete -f kubernetes/deployment.yaml
kubectl delete -f kubernetes/configmap.yaml
kubectl delete -f kubernetes/namespace.yaml
```
