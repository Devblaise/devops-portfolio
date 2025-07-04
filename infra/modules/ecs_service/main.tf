resource "aws_ecs_task_definition" "app" {
  family                   = "${var.project_name}-task"
  cpu                      = 256
  memory                   = 512
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = var.exec_role_arn

  container_definitions = jsonencode([{
    name  = "app"
    image = var.docker_image
    portMappings = [{
      containerPort = var.container_port
      hostPort      = var.container_port
      protocol      = "tcp"
    }]
    environment = [
      {
        name  = "DATABASE_URL"
        value = var.database_url
      }
    ]
    essential = true
  }])
}

resource "aws_ecs_service" "app" {
  name            = "${var.project_name}-svc"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [var.sg_id]
    assign_public_ip = true
  }
}
