
// Kristian Imports
import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";
import productsRouter from "../src/products/index.js";

//Samuel Imports

import reviewsRouter from "./services/reviews/index.js"
import { catchErrorMiddleware, badRequestMiddleware, notFoundMiddleware } from "./errorMiddlewares.js"

// Kapil Imports
import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
// import filesRouter from "./services/files/index.js";
// import filesRouter from "./services/files/index.js";
// import {
//   catchErrorMiddleware,
//   badRequestMiddleware,
//   notFoundMiddleware,
// } from "./errorMiddlewares.js";
import {join, dirname} from "path";
import {fileURLToPath} from "url";
import imgUploadRouter from "./services/ImgUpload/index.js";

const publicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public"
);

const server = express();
const PORT = 3001;

// section for routs and global middlewares
server.use(express.static(publicFolderPath));
server.use(cors());
server.use(express.json());

// Server Routes;
server.use("/product", imgUploadRouter);
server.use("/reviews", reviewsRouter)
server.use("/products", productsRouter);

// server.use("/", function(req,))

// section for the error middlewares;
// KristinanError Midd
server.use(notFound);
server.use(forbidden);
server.use(catchAllErrorHandler);

// Samuel Error Midd
server.use(notFoundMiddleware)
server.use(badRequestMiddleware)
server.use(catchErrorMiddleware)


// Listen the Server at Port 3001;
console.table(listEndpoints(server));
server.listen(PORT, () => {
  console.log("✅Server is Running on the Port : ", PORT);
});
server.on("error", (error) => {
  console.log("❌ Server is NOT Running! on the Port : ", PORT);
});
