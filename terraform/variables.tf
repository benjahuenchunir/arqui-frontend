variable "aws_region" {
  type        = string
  description = "AWS region to use for resources."
  default     = "us-east-1"
}

variable "bucket_name_primary" {
  type        = string
  description = "Name of the S3 Bucket"
  default     = "s3-front-terraform"
}

variable "bucket_name_failover" {
  type        = string
  description = "Name of the S3 Bucket"
  default     = "s3-front-terraform-failover"
}

variable "company" {
  type        = string
  description = "Company name for resource tagging"
  default     = "Arqui"
}

variable "project" {
  type        = string
  description = "Project name for resource tagging"
  default     = "Arqui-Frontend"
}

variable "naming_prefix" {
  type        = string
  description = "Naming prefix for all resources."
  default     = "Demo"
}

variable "environment" {
  type        = string
  description = "Environment for deployment"
  default     = "dev"
}

variable "instance_key" {
  default = "WorkshopKeyPair"
}