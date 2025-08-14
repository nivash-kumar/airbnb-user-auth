//External Modules
const express = require("express");
const contactInfoRouter = express.Router();

//Local Modules.
const contactInfoController = require("../controllers/contactInfoController");


contactInfoRouter.get("/contact-us",contactInfoController.getContactInfo);
contactInfoRouter.post("/contact-us",contactInfoController.postContactInfo);
module.exports = contactInfoRouter;