const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require("../config/cloudinary.config");

//GET /users/  -  Retrieves all users
router.get("/", (req, res, next) => {
  User.find()
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

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified post does not exist" });
    return;
  }

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (user.favorites.includes(postId)) {
        res.json({ message: "Post already in favorites" });
        return;
      }

      User.findByIdAndUpdate(id, { $push: { favorites: postId } }, { new: true })
        .then((updatedUser) => {
          res.json(updatedUser);
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
});

// UPLOAD IMAGE /users/upload - upload an image

router.post("/upload", fileUploader.single("img"), (req, res, next) => {
  console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ img: req.file.path });
});

// PUT /users/:id  -  Updates a specific user
router.put("/:id", isAuthenticated, (req, res, next) => {
  const { id } = req.params; // user owner of the profile
  const userId = req.payload._id; // user connected
  const { email, username, bio, job, location, img, github } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user._id.toString() == userId)
        User.findByIdAndUpdate(id, req.body, { new: true })
          .then((updatedUser) => {
            res.json(updatedUser);
          })
          .catch((err) => res.status(400).json(err));
    });
});

module.exports = router;
