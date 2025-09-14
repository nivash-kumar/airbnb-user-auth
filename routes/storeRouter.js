
//External module
const express = require('express');
const storeRouter = express.Router();

// // //local Module
const storeController = require('../controllers/storeController');
const auth = require('../middleware/auth');

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", auth.isAuth, storeController.getBookings);
storeRouter.get("/favourites", auth.isAuth, storeController.getFavouriteList);
storeRouter.post("/favourites", auth.isAuth, storeController.postAddFavourite);
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
storeRouter.post("/favourites/delete/:homeId", auth.isAuth, storeController.postRemoveFromFavourite);

module.exports = storeRouter;