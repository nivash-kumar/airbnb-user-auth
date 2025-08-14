
//External module
const express = require('express');
const storeRouter = express.Router();

// // //local Module
const storeController = require('../controllers/storeController');

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getfavouriteList);
storeRouter.post("/favourites", storeController.postAddFavourite);
storeRouter.get("/homes/:homeId", storeController.getHomesDetails);
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite);

storeRouter.get("/contact-us", storeController.getcontactUs);
storeRouter.post("/contact-us", storeController.postcontactUs);

module.exports = storeRouter;