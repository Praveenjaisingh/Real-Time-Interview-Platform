const { body, validationResult } = require("express-validator");

exports.createUserValidator = [

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Valid email required"),

    body("password")
        .notEmpty()
        .withMessage("Password required")
        .isLength({ min:6 })
        .withMessage("Password must be at least 6 characters")

];

exports.loginValidator = [

    body("email")
        .notEmpty()
        .withMessage("Email required")
        .isEmail()
        .withMessage("Valid email required"),

    body("password")
        .notEmpty()
        .withMessage("Password required")

];

exports.validate = (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        return res.status(400).json({
            status:false,
            errors:errors.array().map(err=>err.msg)
        });

    }

    next();

};