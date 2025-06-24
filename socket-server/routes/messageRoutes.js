const express = require("express");
const { sendMessage, getMessages } = require("../controller/messageController");
const requireAuth = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(400).json({ error: "Room ID required" });
});

router.post("/send", requireAuth, sendMessage); // Send a message
router.get("/:roomId", requireAuth, getMessages); // Get chat between two users

module.exports = router;
