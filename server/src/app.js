const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const morgan = require("morgan")
const sessions = require("express-session")
const { apiV1 } = require('./routes/users.js')
const app = express()
const { connectDb } = require("./db.js")

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const { UserModel } = require("./models/user")
app.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: true,
  })
)

// app.use("/v1/users", apiV1)

app.use((err, req, res, next) => {
  console.error("Error:", err)
  return res.status(500).json({ error: "Unknown server error" })
})

connectDb()

// connectDb()
//   .then(async () => {
//     const admin = await UserModel.findOne({ username: "admin" })
//     if (admin == null) {
//       await UserModel.create({ username: "admin", password: "admin", role: "admin" })
//     }
//     const guest = await UserModel.findOne({ username: "guest" })
//     if (guest == null) {
//       await UserModel.create({ username: "guest", password: "guest", role: "guest" })
//     }
//   })
//   .then(() => {
//     app.listen(8080, () => console.log("Server is listening on http://localhost:8080"))
//   })
