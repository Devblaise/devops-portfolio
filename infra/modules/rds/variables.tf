variable "db_name" {
  type        = string
  description = "Name of the RDS database"
}
variable "db_username" {
  type        = string
  description = "Username for the RDS database"
}
variable "db_password" {
  type        = string
  description = "Password for the RDS database"
  sensitive   = true
}
variable "subnet_ids" {
  type        = list(string)
  description = "List of subnet IDs for the RDS instance"
}
variable "sg_id" {
  type        = string
  description = "Security group ID for the RDS instance"
}

