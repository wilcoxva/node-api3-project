const express = require('express');
const posts = require("../posts/postDb")

const router = express.Router();

router.get('/', (req, res) => {
  posts.get()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      console.log(error)
        res.status(500).json({
          message: "Error retrieving the posts",
        })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  posts.getById(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      console.log(error)
        res.status(500).json({
          message: "Error retrieving the post",
        })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  posts.remove(req.params.id)
    .then((post) => {
      res.json(post)
    })
    .catch((error) => {
      console.log(error)
			res.status(500).json({
				message: "Error removing the post",
			})
    })
});

router.put('/:id', validatePostId, (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Please enter changes",
    })
  }
  
  posts.update(req.params.id, req.body)  
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      console.log(error)
			res.status(500).json({
				message: "Error updating the post",
			})
    })
});

// custom middleware


function validatePostId(req, res, next) {
  posts.getById(req.params.id)
		.then((post) => {
			if (post) {
				req.post = post
				next()
			} else {
				res.status(400).json({
					message: "Invalid post id",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Could not get post",
			})
		})
}

module.exports = router;
