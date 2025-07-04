output "endpoint" {
  value = aws_db_instance.pg.endpoint
}
output "port" {
  value = aws_db_instance.pg.port
}
output "db_username" {
  value = var.db_username
}

output "db_name" {
  value = var.db_name
}
