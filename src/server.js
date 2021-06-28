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

const publicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public"
);

const server = express();
const PORT = 3001;

// section for routs and global middlewares

// server.use(express.static(publicFolderPath));
// server.use(cors());
// server.use(express.json());
// server.use("/", callbackfunction);

// section for the error middlewares;

// server.use();
// server.use();
// server.use();

// Listen the Server at Port 3001;

console.table(listEndpoints(server));
server.listen(PORT, () => {
  console.log("✅Server is Running on the Port : ", PORT);
});
server.on("error", (error) => {
  console.log("❌ Server is NOT Running! on the Port : ", PORT);
});
