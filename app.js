const express = require("express");
const app = express();

// Other imports
require("dotenv/config");
require("./db");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const indexRoutes = require("./routes/index.routes");
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const commentRoutes = require('./routes/comment.routes');

// Middleware and configuration setup
require("./config/config")(app);

// Routes
app.use("/api", indexRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);

// Error handling middleware
require("./error-handling")(app);

module.exports = app;
