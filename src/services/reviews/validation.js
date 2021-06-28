import { body } from "express-validator"

export const reviewsValidation = [
  body("comment").exists().withMessage("Comment is a mandatory field!"),
  body("rate").exists().withMessage("Rate is a mandatory field!"),
]