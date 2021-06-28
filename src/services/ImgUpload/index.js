import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import fs from "fs";
import path, {dirname, join} from "path";
import {fileURLToPath} from "url";
import {validationResult} from "express-validator";
// import {postValidation} from "./validation.js.js";
import multer from "multer";
import {writeUsersPicture} from "./fs-tools-img.js";

// paths
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

// Routers
const imgUploadRouter = express.Router();

imgUploadRouter.post(
  "/",
  multer().single("img_file"),
  async (req, res, next) => {
    try {
      console.log(req.file);
      await writeUsersPicture(req.file.originalname, req.file.buffer);
      res.send("Image Uploaded! ");
    } catch (error) {
      next(error);
    }
  }
);

imgUploadRouter.get("/", (req, res, next) => {
  try {
    res.send("Working ;;;;;;");
  } catch (error) {
    next(error);
  }
});

export default imgUploadRouter;
