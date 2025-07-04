module "vpc" {
  source     = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
  my_vpc     = "${var.project_name}-vpc"
  azs        = ["eu-central-1a", "eu-central-1b"] # Using a two AZ for simplicity and cost-effectiveness
}

module "ecs" {
  source       = "./modules/ecs"
  cluster_name = "${var.project_name}-cluster"
}

module "rds" {
  source      = "./modules/rds"
  db_name     = "systone"
  db_username = "postgres"
  db_password = var.db_password # set via TF_VAR_db_password
  subnet_ids  = module.vpc.public_subnet_ids
  sg_id       = module.vpc.public_sg_id
}

module "ecs_service" {
  source       = "./modules/ecs_service"
  project_name = var.project_name

  cluster_id    = module.ecs.cluster_id
  exec_role_arn = module.ecs.exec_role_arn

  subnet_ids = module.vpc.public_subnet_ids
  sg_id      = module.vpc.public_sg_id

  docker_image   = var.docker_image   # example: "ghcr.io/you/app:latest"
  container_port = var.container_port # match your server's exposed port

  database_url = "postgres://${module.rds.db_username}:${var.db_password}@${module.rds.endpoint}/${module.rds.db_name}"
}

module "static_site" {
  source      = "./modules/s3_static_site"
  bucket_name = "${var.project_name}-frontend" # e.g. systone-frontend
}
