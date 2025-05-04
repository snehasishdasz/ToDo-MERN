const express = require('express');
const router = express.Router();
const { register, login, logout, getUserData } = require("../controllers/user");
const { requireLogin } = require("../middlewares/auth");

// Register route
// POST /api/v1/user/register
router.post("/signup", register);
router.post("/login", login);

// Logout route
// POST /api/v1/user/logout
router.post("/logout", logout);

// Get user data route
router.get("/", requireLogin, getUserData);

module.exports = router;