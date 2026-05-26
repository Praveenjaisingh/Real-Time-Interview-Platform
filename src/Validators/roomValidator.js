const { body, validationResult } = require("express-validator");

exports.createRoomValidator = [
    body("interviewId")
        .notEmpty()
        .withMessage("Interview ID required")
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