const express = require("express")
const cors = require("cors")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")

const server = express()
const port = 4000

server.use(express.json())
server.use(cors())

server.use(logger)

server.use("/users", userRouter)

server.use((req, res) => {
	res.status(404).json({
		message: "Route was not found",
	})
})

server.use((error, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
    })
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})