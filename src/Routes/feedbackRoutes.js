const express = require("express");
const router = express.Router();

const feedbackController = require("../Controllers/feedbackController");
const verifyToken = require("../Middleware/authMiddleware");

router.post("/", verifyToken, feedbackController.submitFeedback);
router.get("/:interviewId", verifyToken, feedbackController.getFeedbackByInterview);
router.get("/summary/:userId", verifyToken, feedbackController.getFeedbackSummary);

module.exports = router;