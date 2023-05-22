
const router = require("express")()
const { UserModel } = require("../models/user")

const omitPassword = (user) => {
  const { password, ...rest } = user
  return rest
}

router.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find({})
    return res.status(200).json({ users: users.map((user) => omitPassword(user.toJSON())) })
  } catch (err) {
    next(err)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username })
    if (user == null) {
      return res.status(404).json({ error: "User not found" })
    }
    if (user.password !== req.body.password) {
      return res.status(400).json({ error: "Invalid password" })
    }
    console.log("user.id", user.id)
    req.session.userId = user.id
    return res.status(200).json({ user: omitPassword(user.toJSON()) })
  } catch (err) {
    next(err)
  }
})

router.get("/logout", (req, res) => {
  req.session.destroy()
  return res.status(200).json({ success: true })
})

module.exports = { router }
