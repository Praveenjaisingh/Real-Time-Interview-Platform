const express = require("express");
const router = express.Router();

const notificationController = require("../Controllers/notificationController");
const verifyToken = require("../Middleware/authMiddleware");
router.get("/", verifyToken, notificationController.getNotifications);
router.post("/mark-read", verifyToken, notificationController.markAsRead);
router.delete("/:id", verifyToken, notificationController.deleteNotification);

module.exports = router;