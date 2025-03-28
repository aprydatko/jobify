import "express-async-errors"
import express from "express"
const app = express()
import * as dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary"

// routers
import jobRouter from "./routers/jobRouter.js"
import userRouter from "./routers/userRouter.js"
import authRouter from "./routers/authRouter.js"

// public
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"

// middleware
import errorHandleMiddleware from "./middleware/errorHandleMiddleware.js"
import { authenticateUser } from "./middleware/authMiddleware.js"

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, "./public")))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(cookieParser())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" })
})

app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/auth", authRouter)

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" })
})

app.use(errorHandleMiddleware)

const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
