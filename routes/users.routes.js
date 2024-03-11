const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//GET /users/  -  Retrieves all users
router.get("/", (req, res, next) => {
  User.find()
    .populate("posts")
    .then((allUsers) => {
      if (allUsers.length === 0) {
        res.json({ message: "No users in there" });
      } else {
        res.json(allUsers);
      }
    })
    .catch((err) => res.status(400).json(err));
});

//GET /users/:id  -  Retrieves a specific user
router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((posts) => {
      if (!posts) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(posts);
      }
    })
    .catch((err) => res.status(400).json(err));
});

//DELETE /users/:id  -  Deletes a specific user
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => res.status(400).json(err));
});

//PUT /users/:id  -  Updates a specific user
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body)
    .populate("posts")
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => res.status(400).json(err));
});

// GET /users/:id/favorites - get the favorites of a specific user
router.get("/:id/favorites", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate("favorites")
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(user.favorites);
      }
    })
    .catch((err) => res.status(400).json(err));
});

// POST /users/favorites - add a post to the favorites of a specific user
router.post("/favorites", isAuthenticated, (req, res, next) => {
  const id = req.payload._id;
  const { postId } = req.body;

  User.findByIdAndUpdate(id, { $push: { favorites: postId } }, { new: true } )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => res.status(400).json(err));
});


module.exports = router;
