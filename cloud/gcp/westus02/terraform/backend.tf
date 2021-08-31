terraform {
  backend "gcs" {
    bucket  = "kingboo-tf-state"
    prefix  = "terraform/state"
  }
}
