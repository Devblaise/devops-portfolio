# S3 bucket (static site)
resource "aws_s3_bucket" "site" {
  bucket        = var.bucket_name
  force_destroy = true
  tags          = { Name = var.bucket_name }
}

# Allow this bucket to have a public bucket-policy
resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true # keep object ACLs blocked
  ignore_public_acls      = true
  block_public_policy     = false # ← **must be false**
  restrict_public_buckets = false
}


# Static-website hosting configuration
resource "aws_s3_bucket_website_configuration" "site" {
  bucket = aws_s3_bucket.site.id

  index_document {
    suffix = var.index_document
  }

  error_document {
    key = var.error_document
  }
}

# Public "read-only" bucket policy (OK for demo; lock down later)
data "aws_iam_policy_document" "public_read" {
  statement {
    sid    = "PublicReadGetObject"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]
  }
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.public_read.json
}
