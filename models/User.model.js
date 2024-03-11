const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      //to hide 
    },
    username: {
      type: String,
      required: [true, "Please choose an username."],
      unique: [true, "This username is already taken."],
    },
    created: {
      type: Date,
      default: Date.now,
    },
    bio: {
      type: String,
      default: "Introduce yourself to the community of FullStylers ! You'll be able to edit this presentation in your profile settings soon !",
    },
    job: {
      type: String,
      default: "Just some FullStyler",
    },
    location: {
      type: String,
      default: "In front of my laptop",
    },
    img: {
      type: String,
    },
    github: {
      type: String,
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
  }]
    }
);

const User = model("User", userSchema);
module.exports = User;
