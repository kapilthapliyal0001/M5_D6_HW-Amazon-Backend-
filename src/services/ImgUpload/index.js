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
      writeUsersPicture(req.file.originalname, req.file.buffer, new_id);
      res.send("Image Uploaded! ");
    } catch (error) {
      next(error);
    }
  }
);

imgUploadRouter.get("/:id/upload", async (req, res, next) => {
  // section to pass images in the product image id folder present;

  const id = req.params.id;
  const folder_path = join(
    dirname(fileURLToPath(import.meta.url)),
    `../../../public/img/products/${id}`
  );
  const files = await fe.readdir(folder_path);

  const links = files.map(
    (fileName) => `http://localhost:3001/img/products/${id}/${fileName}`
  );
  res.send(links);
});

imgUploadRouter.get("/", (req, res, next) => {
  try {
    res.send("Working");
  } catch (error) {
    next(error);
  }
});

export default imgUploadRouter;
