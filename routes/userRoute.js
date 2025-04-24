const express = require('express');
const router = express.Router();
const { register, login, logout } = require("../controllers/user");


// Register route
// POST /api/v1/user/register
router.post("/register", register);
router.post("/login", login);

// Logout route
// POST /api/v1/user/logout
router.post("/logout", logout);

module.exports = router;