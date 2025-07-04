variable "project_name" {
  description = "Prefix for resource names"
  type        = string
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}


variable "db_password" {
  description = "The password for the RDS database"
  type        = string
  sensitive   = true
}

variable "docker_image" {
  type        = string
  description = "Docker image to deploy"
}

variable "container_port" {
  type        = number
  description = "Port your app listens on"
  default     = 4000 # Default port, can be overridden

}
