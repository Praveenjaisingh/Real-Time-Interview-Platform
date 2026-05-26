const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../Controllers/userController");
const verifyToken = require("../Middleware/authMiddleware");
const { createUserValidator, loginValidator, validate } = require("../Validators/userValidator");

router.post("/create",createUserValidator,validate,userController.createUser);
router.post("/login",loginValidator,validate, userController.userLogin);
router.post("/logout",verifyToken,userController.logOut);

module.exports =  router;

