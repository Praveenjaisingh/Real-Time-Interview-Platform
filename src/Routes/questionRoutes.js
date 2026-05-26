const express = require("express");
const router = express.Router();

const questionController = require("../Controllers/questionController");
const verifyToken = require("../Middleware/authMiddleware");

const {
    createQuestionValidator,
    validate
} = require("../Validators/questionValidator");

router.post("/", verifyToken, createQuestionValidator, validate, questionController.createQuestion);
router.get("/", verifyToken, questionController.getQuestions);
router.get("/:id", verifyToken, questionController.getQuestionById);
router.put("/:id", verifyToken, questionController.updateQuestion);
router.delete("/:id", verifyToken, questionController.deleteQuestion);

module.exports = router;