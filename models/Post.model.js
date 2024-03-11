const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const postModel = new mongoose.Schema({
title: {
    type: String,
    required: true,
    },
description: {
    type: String,
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
    },
    linkToCode: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
    },
});

const Post = model('Post', postModel);
module.exports = Post;