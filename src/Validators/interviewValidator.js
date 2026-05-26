const { body, validationResult } = require("express-validator");

exports.createInterviewValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
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