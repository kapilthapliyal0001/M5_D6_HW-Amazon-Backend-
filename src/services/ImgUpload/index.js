import express from "express";
import uniqid from "uniqid";
import createError from "http-errors";
import fs from "fs";
import fe from "fs-extra";
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
  "/:id/upload",
  multer().single("img_file"),
  async (req, res, next) => {
    //   fe.ensureDir()
    try {
      const new_id = req.params.id;
      console.log(new_id);
      await writeUsersPicture(req.file.originalname, req.file.buffer, new_id);
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
