const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2; // Import Cloudinary SDK
const multer = require('multer'); // Import multer for handling file uploads

const Post = require("../models/Post.model");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

// Configure multer to store uploaded files in memory
const upload = multer();

//GET /api/posts  -  Retrieves all posts
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



// POST /api/posts/create  -  Creates a new post with image uploads to Cloudinary
router.post("/create", upload.array('images', 3), async (req, res, next) => {
  try {
    const { title, description, linkToWebsite, linkToCode, author, category, tags } = req.body;
    const images = req.files; // Get uploaded images from multer

    // Upload images to Cloudinary and get public IDs
    const imagePublicIds = await Promise.all(images.map(async (image) => {
      const result = await cloudinary.uploader.upload(image.buffer.toString('base64'));
      return result.public_id;
    }));

    // Create new post with imagePublicIds
    const newPost = await Post.create({
      title,
      description,
      image1: imagePublicIds[0] || '', // Store public ID of first image (or empty string if not provided)
      image2: imagePublicIds[1] || '', // Store public ID of second image (or empty string if not provided)
      image3: imagePublicIds[2] || '', // Store public ID of third image (or empty string if not provided)
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
