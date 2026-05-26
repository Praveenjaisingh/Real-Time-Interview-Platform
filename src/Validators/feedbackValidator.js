const { body, validationResult } = require("express-validator");

exports.submitFeedbackValidator = [
    body("interviewId").notEmpty().withMessage("Interview ID required"),

    body("rating")
        .notEmpty()
        .withMessage("Rating required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be 1-5"),

    body("comment").optional()
];

exports.validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            errors: errors.array().map(e => e.msg)
        });
    }

    next();
};