const posts = require("../posts/postDb")

module.exports = () => {
    function validatePost() {
        return (req, res, next) => {
            posts.insert(req.body)
                .then((post) => {
                    if (req.body) {
                        res.json(post)
                    } else {
                        res.status(400).json({
                            message: "missing required text field",
                        })
                    }
                })
                .catch((error) => {
                    error.status(400).json({
                        message: "Error validating the post",
                    })
                })
        }
    }
}