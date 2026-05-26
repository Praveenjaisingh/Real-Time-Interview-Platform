const express = require("express");
const router = express.Router();

const submissionController = require("../Controllers/submissionController");
const verifyToken = require("../Middleware/authMiddleware");

router.post("/", verifyToken, submissionController.submitCode);

module.exports = router;