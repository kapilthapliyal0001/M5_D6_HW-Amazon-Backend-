import express from "express";
import fs from "fs";
import path, {dirname, join} from "path";
import {fileURLToPath} from "url";
import uniqid from "uniqid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productsFilePath = path.join(__dirname, "products.json");

const productsRouter = express.Router();

// GET all products
productsRouter.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(productsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({message: error.message});
  }
});
// GET single product
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(productsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    const product = fileAsJSONArray.find(
      (product) => product.id === req.params.productId
    );
    if (!product) {
      res.status(404).send({
        message: `product with an id of ${req.params.productId} is not found`,
      });
    } else {
      res.send(product);
    }
  } catch (error) {
    res.send(500).send({message: error.message});
  }
});
// POST - create products
productsRouter.post("/", async (req, res, next) => {
  try {
    const {name, description, brand, price, category} = req.body;
    const product = {
      id: uniqid(),
      name,
      description,
      brand,
      price,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const fileAsBuffer = fs.readFileSync(productsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    fileAsJSONArray.push(product);
    fs.writeFileSync(productsFilePath, JSON.stringify(fileAsJSONArray));
    res.send(product);
  } catch (error) {
    res.send(500).send({message: error.message});
  }
});
// PUT - update products
productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(productsFilePath);
    const fileAsString = fileAsBuffer.toString();
    let fileAsJSONArray = JSON.parse(fileAsString);
    const productIndex = fileAsJSONArray.findIndex(
      (product) => product.productId === req.params.productsId
    );
    if (!productIndex == -1) {
      res.status(404).send({
        message: `product with an id of ${req.params.productId} is not found`,
      });
    }
    const previousproductData = fileAsJSONArray[productIndex];
    const changedproduct = {
      ...previousproductData,
      ...req.body,
      updatedAt: new Date(),
      id: req.params.productId,
    };
    fileAsJSONArray[productIndex] = changedproduct;
    fs.writeFileSync(productsFilePath, JSON.stringify(fileAsJSONArray));
    res.send(changedproduct);
  } catch (error) {
    res.send(500).send({message: error.message});
  }
});

// Delete products
productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(productsFilePath);
    const fileAsString = fileAsBuffer.toString();
    let fileAsJSONArray = JSON.parse(fileAsString);
    const product = fileAsJSONArray.find(
      (product) => product.id === req.params.productId
    );
    if (!product) {
      // console.log(
      //   "Check this: ",
      //   product.id,
      //   "should be same",
      //   req.params.productsId
      // );
      res.status(404).send({
        message: `product with an id of ${req.params.productId} is not found`,
      });
    } else {
      fileAsJSONArray = fileAsJSONArray.filter(
        (product) => product.id !== req.params.productId
      );
    }
    fs.writeFileSync(productsFilePath, JSON.stringify(fileAsJSONArray));
    res.status(204).send();
  } catch (error) {
    res.send(500).send({message: error.message});
  }
});

export default productsRouter;
