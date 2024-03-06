const { Schema, model } = require('mongoose');
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const commentModel = new Schema({
    name: { // if isAuthenticated==true, then name=user.username, else name=Anonymous
        type: String,
        required: true,
        default: "Anonymous"
    },
    comment: {
        type: String,
        required: true,
        default: "Enter your comment here. Please be respectful and constructive."
    },
});

const Comment = model('Comment', commentModel);
module.exports = Comment;


