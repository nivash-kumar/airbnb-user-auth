
//External module
const express = require("express");
const hostRouter = express.Router();

//local Module
const hostController = require('../controllers/hostController');
const auth = require('../middleware/auth');

hostRouter.get("/add-home", auth.isAuth, auth.isHost, hostController.getAddHome);
hostRouter.post("/add-home", auth.isAuth, auth.isHost, hostController.postAddHome);
hostRouter.get("/home-list", auth.isAuth, auth.isHost, hostController.getHostHomes);
hostRouter.get("/edit-home/:homeId", auth.isAuth, auth.isHost, hostController.getEditHome);
hostRouter.post("/edit-home", auth.isAuth, auth.isHost, hostController.postEditHome);
hostRouter.post("/delete-home/:homeId", auth.isAuth, auth.isHost, hostController.postDeleteHome);

module.exports = hostRouter;
