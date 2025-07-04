output "bucket_name" {
  value       = aws_s3_bucket.site.bucket
  description = "Name of the S3 bucket"
}

output "website_endpoint" {
  value       = aws_s3_bucket_website_configuration.site.website_endpoint
  description = "URL of the static website (HTTP)"
}
