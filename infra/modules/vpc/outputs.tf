output "vpc_id" {
  value       = aws_vpc.main.id
  description = "The ID of the VPC"
}

output "public_subnet_ids" {
  value       = aws_subnet.public[*].id
  description = "IDs of public subnets"
}

output "public_sg_id" {
  value       = aws_security_group.public.id
  description = "Security group for public traffic"
}
