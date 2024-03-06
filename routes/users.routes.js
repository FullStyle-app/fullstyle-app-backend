const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

//GET /users/  -  Retrieves all users
router.get("/", (req, res, next) => {
    User.find()
        .then((allUsers) => {
            if (allUsers.length === 0) {
                res.json({ message: 'No users in there' });
            } else {
                res.json(allUsers);
            }
        })
        .catch((err) => res.status(400).json(err));
});

//GET /users/:id  -  Retrieves a specific user
router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
    .then((user) => {
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    })
    .catch((err) => res.status(400).json(err))
});

//DELETE /users/:id  -  Deletes a specific user
router.delete("/:id", (req, res, next) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
    .then((user) => {
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    })
    .catch((err) => res.status(400).json(err))
});

module.exports = router;
