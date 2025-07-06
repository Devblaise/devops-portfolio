# 📰 Systone Blog App – Full‑Stack Deployment on AWS

A full‑stack portfolio blog platform built with **Next.js** (frontend) and **Node.js + PostgreSQL** (backend), deployed to **AWS** using **Terraform** and **Docker**, with CI/CD powered by **GitHub Actions**.

---

## 🚀 Project Overview

This project demonstrates a complete infrastructure deployment pipeline for a containerised application using modern DevOps practices.

* **Frontend**  – Next.js (statically exported to S3)
* **Backend**   – Node.js Express API (Dockerised & deployed on ECS Fargate)
* **Database**  – PostgreSQL (RDS t3.micro – free‑tier)
* **Infrastructure** – Terraform‑managed AWS resources
* **CI/CD**     – GitHub Actions

## 🧱 Architecture

```text
Developer Pushes Code
      ↓
GitHub Actions
├── Build & Push Docker Images          (client / server)
├── Terraform Apply (AWS infrastructure)
└── Sync Static Frontend to S3          (after `next export`)

---

📂 Project Structure

```text
.
├── client/                 # Next.js frontend (TypeScript & Tailwind)
├── server/                 # Express.js backend (REST API)
├── infra/                  # Terraform root + modules
│   ├── modules/
│   │   ├── vpc/
│   │   ├── ecs/
│   │   ├── rds/
│   │   └── s3_static_site/
│   ├── main.tf             # Root module wiring
│   ├── variables.tf        # Global variables
│   └── outputs.tf          # Global outputs
└── .github/workflows/
    └── ci.yml              # Build → Deploy workflow
```

---

## ⚙️ Deployment Setup

### 1  Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/systone-app.git
cd systone-app
```

### 2  Configure GitHub Secrets

Add these repository‑level secrets under **Settings → Secrets → Actions**:

| Secret                  | Purpose                               |
| ----------------------- | ------------------------------------- |
| `DOCKERHUB_USERNAME`    | Push Docker images                    |
| `DOCKERHUB_TOKEN`       | 〃                                     |
| `AWS_ACCESS_KEY_ID`     | Terraform & S3 sync                   |
| `AWS_SECRET_ACCESS_KEY` | 〃                                     |
| `DB_PASSWORD`           | Postgres password passed to Terraform |

### 3  (Recommended) Remote Terraform state

Create an S3 bucket & DynamoDB table, then add `backend.tf`:

```hcl
terraform {
  backend "s3" {
    bucket         = "systone-terraform-state"
    key            = "global/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "systone-tf-lock"
    encrypt        = true
  }
}
```

Run `terraform init` to migrate local state.

### 4  CI/CD Flow

Every push to **main** triggers:

1. **Docker build & push** for `client` and `server` images
2. **Terraform apply** – provisions/updates AWS infrastructure
3. **Next.js build & export** – `client/out` synced to the S3 bucket
4. Workflow prints the live URL

---

## 🌐 Live Demo

> After a successful deploy, visit the static‑site endpoint printed by Terraform, e.g.:
>
> `http://systone-frontend.s3-website.eu-central-1.amazonaws.com`

*(Add a custom domain & HTTPS via CloudFront for production.)*

---

## 🧪 Local Development

```bash
# Start frontend (Next.js dev server)
cd client
npm install
npm run dev

# In a new terminal: start backend API
cd ../server
npm install
npm run dev
```
The frontend reads `NEXT_PUBLIC_API_URL` to call the local or cloud API.

---
