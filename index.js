const express = require("express")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express()
const port = process.env.PORT || 4000

server.use(express.json())
server.use(logger())

server.use("/users", userRouter)
server.use("/posts", postRouter)

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})