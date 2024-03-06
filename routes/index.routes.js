const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here / api");
});

//router.get("/users", (req, res, next) => {
//  res.status(200).json("All good in here / api / users");
//});

//router.get("/posts", (req, res, next) => {
//  res.status(200).json("All good in here / api / posts");
//});

module.exports = router;
