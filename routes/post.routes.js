const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware.js"); // Middleware to protect routes

const Post = require("../models/Post.model");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

//GET /posts/  -  Retrieves all posts
router.get("/", (req, res, next) => {
    Post.find()
        .populate("author")
        .then((allPosts) => {
            if (allPosts.length === 0) {
                res.json({ message: 'No posts in there' });
            } else {
                res.json(allPosts);
            }
        })
        .catch((err) => res.status(400).json(err));
});



// POST /posts/create  - 
router.post("/create", isAuthenticated, async (req, res, next) => {
  try {
    const { title, description, image1, linkToWebsite, linkToCode, category, tags } = req.body;

 
    const author = req.payload._id; // Get the user ID from the JWT payload

   

    // Create new post with imagePublicIds
    const newPost = await Post.create({
      title,
      description,
      image1, 
      linkToWebsite,
      linkToCode,
      author,
      category,
      tags
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//POST /posts/upload  -  Uploads a file to Cloudinary
router.post("/upload", fileUploader.single("image1"), (req, res, next) => {
    console.log("file is: ", req.file)


    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ image1: req.file.path });
});
 

//  GET /api/posts/:postId  - Retrieves a specific post by id
router.get("/:postId", (req, res, next) => {
    const { postId } = req.params;

    Post.findById(postId)
        .populate("author")
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// GET /posts/u/:userId  - Retrieves all posts from a specific user
router.get("/u/:userId", (req, res, next) => {
    const { userId } = req.params;
    Post.find({author:userId})
      .then((posts) => {
        if (!posts) {
          res.status(404).json({ message: "Posts from this user not found" });
        } else {
          res.json(posts);
        }
      })
      .catch((err) => res.status(400).json(err));
  });

// PUT  /posts/:postId  - Updates a specific post by id
router.put("/:postId", isAuthenticated, (req, res, next) => {
    const { postId } = req.params;
    const user = req.payload._id;
    const { title, description, image1, linkToWebsite, linkToCode, category, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Post.findById(postId)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            if (user === post.author.toString()) {
                Post.findByIdAndUpdate(postId, req.body, { new: true })
                .then ((updatedPost) => {
                    res.status(200).json(updatedPost)
                    console.log('post updated')
                })
                .catch ((error) => res.status(400).json({message: "Error updating post"}))
            } else {
                res.status(403).json({ message: "Unauthorized" });
            }
        })
        .catch((err) => res.status(400).json(err));
});

//  DELETE /posts/:postId  - Deletes a specific post by id
router.delete("/:postId", isAuthenticated, (req, res, next) => {
    const { postId } = req.params;
    const user = req.payload._id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    

    Post.findById(postId)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            if (user === post.author.toString()) {
                return Post.findByIdAndDelete(postId);
            } else {
                res.status(403).json({ message: "Unauthorized" });
            }
        })
        .then(() =>{
            res.json({ message: 'Post deleted successfully' });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
