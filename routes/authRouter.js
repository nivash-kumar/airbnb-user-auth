//external module
const express = require("express");
const authRouter = express.Router();

//local modules
const authController = require("../controllers/authController");
console.log("authRouter loaded");

authRouter.get("/login",authController.getLogin);
authRouter.post("/login",authController.postLogin);
authRouter.get("/signup",authController.getSignup)
authRouter.post("/signup",authController.postSignup);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;