const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn
  });
};

exports.postAddHome = (req, res, next) => {
  // console.log(`Home registration successful for: `, req.body, req.body.houseName);
  const { houseName, ownerName, price, city, address, rating, photoUrl, contactNumber, description } = req.body;
  // registeredHomes.push(req.body);
  const home = new Home({houseName, ownerName, price, city, address, rating, photoUrl, contactNumber, description})
  home.save().then(()=>{
    console.log("Home Registered Successfully");
  });
  res.redirect('/host/home-list');
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then(registeredHomes => {
    res.render('host/host-home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Host-Home',
      currentPage: 'host-homes',
      isLoggedIn: req.isLoggedIn
    });
  });
}


exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true';

  Home.findById(homeId).then(home => {
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
      isLoggedIn: req.isLoggedIn
    });
  });
};

exports.postEditHome = (req, res, next) => {
  // console.log(`Home registration successful for: `, req.body, req.body.houseName);
  const { id, houseName, ownerName, price, city, address, rating, photoUrl, contactNumber, description } = req.body;

 Home.findById(id).then((home) =>{
  home.houseName = houseName;
  home.ownerName = ownerName;
  home.price = price;
  home.city = city;
  home.address = address;
  home.rating = rating;
  home.photoUrl = photoUrl;
  home.contactNumber = contactNumber;
  home.description = description;
  home.save().then((result) => {
    console.log("Home update:",result);
  }).catch(err => {
    console.log("Error while updating", err);
  })
  res.redirect('/host/home-list');
 }).catch(err => {
  console.log("Error while finding home",err);
 });
};


exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId).then(() => {
    res.redirect('/host/home-list');
  }).catch(err =>{
    console.log("Error while deleting home:", err);
    res.redirect('/host/home-list');
  })
}