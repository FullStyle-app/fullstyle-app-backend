const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// to import : 
// npm install mongoose P
// npm install express P
// npm install cors P
// npm install bcrypt P
// npm install dotenv P
// npm install jsonwebtoken P
