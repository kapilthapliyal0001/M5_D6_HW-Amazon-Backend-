import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";
import productsRouter from "../src/products/index.js";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/products", productsRouter);

server.use(notFound);
server.use(forbidden);
server.use(catchAllErrorHandler);

console.log(listEndpoints(server));

server.listen(port, () => console.log("Server is running on port", port));
server.on("error", (error) =>
  console.log(`server is not running, error: " ${error}`)
);
