const express = require("express");
const router = express.Router();

const interviewController = require("../Controllers/interviewController");
const verifyToken = require("../Middleware/authMiddleware");
const {
    createInterviewValidator,
    validate
} = require("../Validators/interviewValidator");

router.post("/", verifyToken, createInterviewValidator, validate, interviewController.createInterview);
router.get("/", verifyToken, interviewController.getInterviews);
router.get("/:id", verifyToken, interviewController.getInterviewById);
router.put("/:id", verifyToken, interviewController.updateInterview);
router.delete("/:id", verifyToken, interviewController.deleteInterview);

module.exports = router;