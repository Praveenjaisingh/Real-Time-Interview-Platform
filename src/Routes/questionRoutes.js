const express = require("express");
const router = express.Router();

const questionController = require("../Controllers/questionController");
const aiController = require("../Controllers/aiController");
const verifyToken = require("../Middleware/authMiddleware");
const { resumeUpload } = require("../Middleware/uploadMiddleware");

const {
    createQuestionValidator,
    validate
} = require("../Validators/questionValidator");

router.post("/", verifyToken, createQuestionValidator, validate, questionController.createQuestion);
router.get("/", verifyToken, questionController.getQuestions);
router.get("/:id", verifyToken, questionController.getQuestionById);
router.put("/:id", verifyToken, questionController.updateQuestion);
router.delete("/:id", verifyToken, questionController.deleteQuestion);

// AI: generate tailored interview questions from a resume + job description
router.post(
    "/generate/ai",
    verifyToken,
    resumeUpload.single("resume"),
    aiController.generateQuestions
);

module.exports = router;