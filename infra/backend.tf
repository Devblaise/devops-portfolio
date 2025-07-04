# infra/backend.tf
terraform {
  backend "s3" {
    bucket = "systone-terraform-state"
    key    = "global/terraform.tfstate"
    region = "eu-central-1"

    # State locking & consistency
    dynamodb_table = "systone-tf-lock"
    encrypt        = true
  }
}
