// TODO: ex. TF_VAR_region
// https://www.terraform.io/docs/language/values/variables.html
variable "project" {
  type = string
  default = "kingboo"
}

variable "region" {
  type = string
  default = "us-east1"
}

variable "zone" {
  type = string
  default = "us-east1-b"
}

variable "vm_name" {
  type = string
  default = "vm-kingboo-instance"
}

variable "user_name" {
  type = string
  default = "west"
}

variable "user_pub_key" {
  type = string
}

variable "github-service_name" {
  type = string
  default = "github-service"
}

variable "github-service_pub_key" {
  type = string
}

variable "service_email" {
  type = string
  default = "51069084108-compute@developer.gserviceaccount.com"
}
