const apiV1 = require("express")()
const { router: bookRouter } = require("./books.js")
const { router: userRouter } = require("./users.js")

apiV1.use("/book", bookRouter)
apiV1.use("/user", userRouter)

module.exports = { apiV1 }
