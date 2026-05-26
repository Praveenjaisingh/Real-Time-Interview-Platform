const express = require("express");
const router = express.Router();

const chatController = require("../Controllers/chatController");
const verifyToken = require("../Middleware/authMiddleware");
router.get("/:interviewId", verifyToken, chatController.getMessages);
router.post("/send", verifyToken, chatController.sendMessage);
router.delete("/:id", verifyToken, chatController.deleteMessage);

module.exports = router;