variable "cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "azs" {
  description = "List of Availability Zones"
  type        = list(string)
}

variable "my_vpc" {
  description = "Name prefix for VPC resources"
  type        = string
}

variable "public_subnet_count" {
  description = "Number of public subnets to create"
  type        = number
  default     = 2 # Default to 2 for simplicity and to keep costs low, can be overridden
}

