const express = require("express");
const { getHomePage } = require("../controllers/homeController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

// Endpoint untuk halaman Home
router.get("/", authenticate, getHomePage);

module.exports = router;
