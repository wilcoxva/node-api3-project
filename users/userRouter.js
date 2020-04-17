const express = require('express')
const users = require("../users/userDb")
const posts = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      console.log(error)
        res.status(500).json({
          message: "Error creating the user",
        })
    })
});

router.post("/:id/posts", validatePost, validateUserId, (req, res, next) => {
  posts.insert({ ...req.body, user_id: req.params.id })
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      console.log(error)
        res.status(500).json({
          message: "Error creating the post",
        })
    })
});

router.get('/', (req, res) => {
  users.get()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      console.log(error)
        res.status(500).json({
          message: "Error retrieving the users",
        })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  users.getById(req.params.id)
    .then((user) => {
      res.status(202).json(user)
    })
    .catch((error) => {
      console.log(error)
			res.status(500).json({
				message: "Error getting the user",
			})
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  users.getUserPosts(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch((error) => {
      console.log(error)
			res.status(500).json({
				message: "Error retrieving the posts",
			})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  users.remove(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch((error) => {
      console.log(error)
			res.status(500).json({
				message: "Error removing the user",
			})
    })
});

router.put('/:id', validateUserId, (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Please enter changes",
    })
  }
  
  users.update(req.params.id, req.body)  
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      console.log(error)
			res.status(500).json({
				message: "Error updating the user",
			})
    })
});

//custom middleware

function validateUserId(req, res, next) {
	users.getById(req.params.id)
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
  console.log(req.body)
  if (req.body) {
    if (req.body.name) {
      next()
    } else { res.status(400).json({
      message: "Please send a name"
    }) }
  } else {
    res.status(400).json({
      message: "Missing user data"
    })
  }
}

function validatePost(req, res, next) {
  console.log(req.body)
  if (req.body) {
    if (req.body.text) {
      next()
    } else { res.status(400).json({
      message: "Please send the proper text"
    }) }
  } else {
    res.status(400).json({
      message: "Missing post data"
    })
  }
}

module.exports = router;
