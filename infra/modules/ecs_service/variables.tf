variable "project_name" { type = string }
variable "cluster_id" { type = string }
variable "exec_role_arn" { type = string }
variable "subnet_ids" { type = list(string) }
variable "sg_id" { type = string }

variable "docker_image" { type = string }   # e.g. ghcr.io/your/image:tag
variable "container_port" { type = number } # 8000 or 3000 etc.
variable "database_url" { type = string }   # full DB URL

