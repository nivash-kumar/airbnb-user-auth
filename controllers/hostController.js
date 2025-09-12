const Home = require("../models/home");
const User = require("../models/user");
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.postAddHome = (req, res, next) => {
  console.log("photo", req.body);
  console.log("file is:", req.file);

  if(!req.file){
    console.log("No file uploaded in image format");
    return res.status(422).send("No file uploaded in image format");
  }
  const {
    houseName,
    ownerName,
    price,
    city,
    address,
    rating,
    contactNumber,
    description,
  } = req.body;
  const photo = req.file.path;
  // registeredHomes.push(req.body);
  const home = new Home({
    houseName,
    ownerName,
    price,
    city,
    address,
    rating,
    contactNumber,
    description,
    photo,
  });
  home.save().then(() => {
    console.log("Home Registered Successfully");
  });
  res.redirect("/host/home-list");
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host-Home",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  // console.log(`Home registration successful for: `, req.body, req.body.houseName);
  const {
    id,
    houseName,
    ownerName,
    price,
    city,
    address,
    rating,
    contactNumber,
    description,
  } = req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.ownerName = ownerName;
      home.price = price;
      home.city = city;
      home.address = address;
      home.rating = rating;
      home.contactNumber = contactNumber;
      home.description = description;

      if(req.file){
        fs.unlink(home.photo, (err) =>{
          console.log("ERROR WHILE UPDTE IMAGE FILE", err);
        });
        home.photo = req.file.path;
      }

      home
        .save()
        .then((result) => {
          console.log("Home update:", result);
        })
        .catch((err) => {
          console.log("Error while updating", err);
        });
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log("Error while finding home", err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log("Error while deleting home:", err);
      res.redirect("/host/home-list");
    });
};
