const users = require("../users/userDb")

module.exports = () => {
    function validateUser() {
        return (req, res, next) => {
            users.insert(req.body)
                .then((user) => {
                    if (req.body) {
                        res.json(user)
                    } else {
                        res.status(400).json({
                            message: "missing required name field",
                        })
                    }
                })
                .catch((error) => {
                    error.status(400).json({
                        message: "Error validating the user",
                    })
                })
        }
    }
}