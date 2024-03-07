const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const postModel = new mongoose.Schema({
title: {
    type: String,
    required: true,
    default: "Enter a title for your FullStyle Project"
    },
description: {
    type: String,
    default: "Describe your project here. What is it about? What are you proud of? What were your design inspirations?"
    },
    image1: {
        type: String,
        required: true,
    },
    image2: {
        type: String,
    },
    image3: {
        type: String,
    },
    linkToWebsite: {
        type: String,
        default: "If this project is online, please share the link here"
    },
    linkToCode: {
        type: String,
        required: true,
        default: "Share your code with the FullStylers' community"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true,
        default: "Choose a category for your project, it will help the FullStylers to find it easily"
    },
    tags: {
        type: [String],
        default: ["Add some tags to help the FullStylers to find your project even more easily"]
    },
});

const Post = model('Post', postModel);
module.exports = Post;