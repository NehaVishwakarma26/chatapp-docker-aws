const express = require("express");
const { sendMessage, getMessages } = require("../controller/messageController");
const requireAuth = require("../middlewares/authMiddleware");

const router = express.Router();

// 🔒 All routes protected by authMiddleware
router.post("/send", requireAuth, sendMessage); // Send a message
router.get("/:roomId", requireAuth, getMessages); // Get chat between two users

module.exports = router;
