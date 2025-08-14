//Local Modules
const ContactInfo = require("../models/contactInfo");

exports.getContactInfo = (req, res, next) => {
    // console.log("contact Page was opend!", req);
    res.render('store/contact-us',{
        pageTitle : "contact us",
        currentPage : "contact-us"
    });
};

exports.postContactInfo = (req, res, next) =>{
    const{name, phone, message, email} = req.body;
    const contactInfo = new ContactInfo(name, phone, message, email);
    console.log("Data send to Models");
    contactInfo.save();
    
    res.redirect("/homes");
};