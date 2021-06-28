import express from "express"
import fs from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid"

import createError from "http-errors"
import { validationResult } from "express-validator"
import { reviewsValidation } from "./validation.js"

const reviewsRouter =  express.Router()

const reviewsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "reviews.json")

const getReviews = () => JSON.parse(fs.readFileSync(reviewsJSONPath))
const writeReviews = (content)=> fs.writeFileSync(reviewsJSONPath, JSON.stringify(content))

reviewsRouter.get("/", (req, res, next) => {
    try {
        //res.send("Hello")
     res.send(getReviews())
    } catch (error) {
      next(error)
    }
})

reviewsRouter.get("/:id", (req, res, next) => {
    try {
        const reviews = getReviews()
        const review = reviews.find(r => r._id === req.params.id)
        if(review) {
            res.send(review)
        } else {
            next(createError(404, `Review with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})


reviewsRouter.get("/:id/reviews", (req, res, next) => {
    try {
        const reviews = getReviews()
        const review = reviews.find(r => r._id === req.params.id)
        if(review) {
            res.send(review)
        } else {
            next(createError(404, `Review with id ${req.params.id} not found!`))
        }
    } catch (error) {
        next(error)
    }
})


reviewsRouter.post("/:id", reviewsValidation, (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(errors.isEmpty()) {
            const newReview = { ...req.body, _id: uniqid(), productId:req.params.id, createdAt: new Date()}
            console.log(newReview)
            const reviews = getReviews()
            console.log(reviews)
            reviews.push(newReview)
            console.log(reviews)
            writeReviews(reviews)
            res.status(201).send({ _id: newReview._id })
        } else {
            next(createError(400, { errorsList: errors }))
        }
    } catch (error) {
        next(error)
    }
})

reviewsRouter.put("/:id", (req, res, next) => {
    try {
        const reviews = getReviews()
        const targetReviewIndex = reviews.findIndex(r => r._id === req.params.id)
        const targetReview = reviews[targetReviewIndex]
        if(targetReview) {
            reviews[targetReviewIndex] = { ...targetReview, ...req.body }
          writeReviews(reviews)
          res.status(200).send(reviews[targetReviewIndex])
        } else {
          res.status(400).send({error: "Review does not exist"})
        }
    } catch (error) {
        next(error)
    }
})

reviewsRouter.delete("/:id", (req, res, next) => {
    try {
        const reviews = getReviews()
        const remainingReviews = reviews.filter(r => r._id !== req.params.id)
        writeReviews(remainingReviews)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

export default reviewsRouter