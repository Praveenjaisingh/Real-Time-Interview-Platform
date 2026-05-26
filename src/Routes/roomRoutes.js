const express = require("express");
const router = express.Router();

const roomController = require("../Controllers/roomController");
const verifyToken = require("../Middleware/authMiddleware");

router.post("/", verifyToken, roomController.createRoom);
router.post("/:id/join", verifyToken, roomController.joinRoom);
router.post("/:id/leave", verifyToken, roomController.leaveRoom);
router.post("/:id/end", verifyToken, roomController.endRoom);
router.get("/:id/participants", verifyToken, roomController.getParticipants);

module.exports = router;