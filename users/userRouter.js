const express = require('express');
const users = require("../users/userDb")

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
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

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
