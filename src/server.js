import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"

import reviewsRouter from "./services/reviews/index.js"
import { catchErrorMiddleware, badRequestMiddleware, notFoundMiddleware } from "./errorMiddlewares.js"

const port = 3001
const server =  express()


server.use(cors())
server.use(express.json())

server.use("/reviews", reviewsRouter)

server.use(notFoundMiddleware)
server.use(badRequestMiddleware)
server.use(catchErrorMiddleware)

console.table(listEndpoints(server))

server.listen(port, ()=>{
    console.log("Server is running on port " + port)
})