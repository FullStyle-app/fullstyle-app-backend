const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

//GET /comments/  -  Retrieves all comments
router.get('/', (req, res) => {
  Comment.find()
    .then(allComments => {
      res.json(allComments);
    })
    .catch(error => {
      res.status(500).json({ message: "Error with getting comments" });
    });
});

// POST /comments/create  -  Creates a new comment
router.post('/:postId', isAuthenticated, (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    const author = req.payload._id;
   
    Comment.create({ postId, text, author})
      .then(newComment => {
        res.status(201).json(newComment);
      })
      .catch(error => {
        res.status(400).json({ message: error.message });
      });
  });
  

//GET /comments/:postId  -  Retrieves all comments for a specific post
router.get('/:postId', (req, res) => {
  const { postId } = req.params;

  Comment.find({ postId: postId })
    .then(comments => {
      res.json(comments);
    })
    .catch(error => {
      res.status(500).json({ message: "Error with getting comments" });
    });
});

module.exports = router;

