variable "bucket_name" {
  description = "Unique name for the S3 bucket (lowercase, no spaces)"
  type        = string
}

variable "index_document" {
  description = "Default root document"
  type        = string
  default     = "index.html"
}

variable "error_document" {
  description = "Document for 4xx/5xx errors"
  type        = string
  default     = "index.html" # React SPA fallback
}
