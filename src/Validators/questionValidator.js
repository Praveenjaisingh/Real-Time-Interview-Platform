const { body, validationResult } = require("express-validator");

exports.createQuestionValidator = [
    body("title").notEmpty().withMessage("Title required"),
    body("description").notEmpty().withMessage("Description required"),
    body("difficulty")
        .notEmpty()
        .withMessage("Difficulty required")
        .isIn(["easy", "medium", "hard"])
        .withMessage("Invalid difficulty")
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