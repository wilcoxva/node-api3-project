module.exports = () => {
    function validateUserId() {
	return (req, res, next) => {
		users.findById(req.params.id)
			.then((user) => {
				if (user) {
					req.user = user
					next()
				} else {
					res.status(400).json({
						message: "Invalid user id",
					})
				}
			})
			.catch((error) => {
				console.log(error)
				res.status(500).json({
					message: "Could not get user",
				})
			})
	}
}}