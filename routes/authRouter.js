
//External module
const express = require('express');
const authRouter = express.Router();

// // //local Module
const authController = require('../controllers/authController');

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

module.exports = authRouter;