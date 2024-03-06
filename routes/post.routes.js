const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post.model");

//GET /api/posts  -  Retrieves all posts
router.get("/", (req, res, next) => {
    Post.find()
        .then((allPosts) => {
            if (allPosts.length === 0) {
                res.json({ message: 'No posts in there' });
            } else {
                res.json(allPosts);
            }
        })
        .catch((err) => res.status(400).json(err));
});

//  POST /api/posts  -  Creates a new post
router.post("/create", (req, res, next) => {
    const { title, description, image1, image2, image3, linkToWebsite, linkToCode, author, category, tags } = req.body;

    Post.create({ title, description, image1, image2, image3, linkToWebsite, linkToCode, author, category, tags })
        .then((newPost) => {
            res.status(201).json(newPost);
        })
        .catch((err) => res.status(400).json(err));
});

//  GET /api/posts/:postId  - Retrieves a specific post by id
router.get("/:postId", (req, res, next) => {
    const { postId } = req.params;

    Post.findById(postId)
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// PUT  /api/posts/:postId  - Updates a specific post by id
router.put("/:postId", (req, res, next) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Post.findByIdAndUpdate(postId, req.body, { new: true })
        .then((updatedPost) => {
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(updatedPost);
        })
        .catch((err) => res.status(400).json(err));
});

//  DELETE /api/posts/:postId  - Deletes a specific post by id
router.delete("/:postId", (req, res, next) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Post.findByIdAndDelete(postId)
        .then((deletedPost) => {
            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json({ message: 'Post deleted successfully' });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
