####################################################
# S3 static website bucket
####################################################
resource "aws_s3_bucket" "s3-static-website" {
  bucket = var.bucket_name
  tags = merge(var.common_tags, {
    Name = "${var.naming_prefix}-s3-bucket"
  })
  force_destroy = true
}

####################################################
# S3 public access settings
####################################################
resource "aws_s3_bucket_public_access_block" "static_site_bucket_public_access" {
  bucket = aws_s3_bucket.s3-static-website.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

####################################################
# S3 bucket static website configuration
####################################################
resource "aws_s3_bucket_website_configuration" "static_site_bucket_website_config" {
  bucket = aws_s3_bucket.s3-static-website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

####################################################
# Upload files to S3 Bucket 
####################################################

resource "aws_s3_object" "provision_source_files" {
  bucket = aws_s3_bucket.s3-static-website.id

  for_each = fileset("${var.source_files}/", "**/*.*")

  key    = each.value
  source = "${var.source_files}/${each.value}"
  content_type = lookup(
    local.mime_types,
    length(regexall("\\.[^.]+$", each.value)) > 0 ? trim(regexall("\\.[^.]+$", each.value)[0], ".") : "",
    "application/octet-stream"
  )

  etag = filemd5("${var.source_files}/${each.value}")
}