resource "aws_db_subnet_group" "this" {
  name       = "systone-rds-subnet"
  subnet_ids = var.subnet_ids
}

resource "aws_db_instance" "pg" {
  identifier             = "systone-pg"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  username               = var.db_username
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.this.name
  vpc_security_group_ids = [var.sg_id]

  publicly_accessible = false
  skip_final_snapshot = true
  deletion_protection = false
}

