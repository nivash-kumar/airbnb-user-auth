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
  console.log("file is:", req.files);

  if (!req.files || req.files.length === 0) {
    console.log("No file uploaded in right format ");
    return res.status(422).render("host/edit-home", {
      pageTitle: "Add Home to airbnb",
      currentPage: "addHome",
      editing: false,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
      errors: ["Please upload both image and PDF files"]
    });
  }
  const {
    houseName,
    ownerName,
    price,
    city,
    address,
    rating,
    // contactNumber,
    description,
  } = req.body;

  const photo = [];
  const rulesPdf = [];
  req.files.forEach((el) => {
    if (el.fieldname === "photo") {
      photo.push(el.path);
      console.log(photo);
    } else if (el.fieldname === "rulesPdf") {
      rulesPdf.push(el.path);
      console.log(rulesPdf);
    }
  });
  if (photo.length === 0 || rulesPdf.length === 0) {  
    return res.status(422).render("host/edit-home", {
      pageTitle: "Add Home to airbnb",
      currentPage: "addHome",
      editing: false,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
      errors: ["Both image and PDF files are required"]
    });
  }

  const home = new Home({
    houseName,
    ownerName,
    price,
    city,
    address,
    rating,
    // contactNumber,
    description,
    photo: photo[0],
    rulesPdf: rulesPdf[0],
  });
  home.save()
    .then(() => {
      console.log("Home Registered Successfully");
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log("Error saving home:", err);
      return res.status(500).render("host/edit-home", {
        pageTitle: "Add Home to airbnb",
        currentPage: "addHome",
        editing: false,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
        errors: ["Error saving home. Please try again."]
      });
    });
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
  const {
    id,
    houseName,
    ownerName,
    price,
    city,
    address,
    rating,
    // contactNumber,
    description,
  } = req.body;

  const photo = [];
  const rulesPdf = [];

  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.ownerName = ownerName;
      home.price = price;
      home.city = city;
      home.address = address;
      home.rating = rating;
      // home.contactNumber = contactNumber;
      home.description = description;

      if (req.files) {
        req.files.forEach(el => {
          if (el.fieldname === "photo") {
            // Delete old photo file
            if (home.photo) {
              fs.unlink(home.photo, (err) => {
                if (err) console.log("ERROR WHILE UPDATING IMAGE FILE", err);
              });
            }
            photo.push(el.path);
          } else if (el.fieldname === "rulesPdf") {
            // Delete old PDF file
            if (home.rulesPdf) {
              fs.unlink(home.rulesPdf, (err) => {
                if (err) console.log("ERROR WHILE UPDATING PDF FILE", err);
              });
            }
            rulesPdf.push(el.path);
          }
        });
        
        // Update file paths only if new files were uploaded
        if (photo.length > 0) {
          home.photo = photo[0];
        }
        if (rulesPdf.length > 0) {
          home.rulesPdf = rulesPdf[0];
        }
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
  // Home.findByIdAndDelete(homeId)
  //   .then(() => {
  //     res.redirect("/host/home-list");
  //   })
  //   .catch((err) => {
  //     console.log("Error while deleting home:", err);
  //     res.redirect("/host/home-list");
  //   });
  Home.findById(homeId)
    .then((home) => {
      console.log(home);
      fs.unlink(home.photo, (err) => {
        if (err) console.log("Error deleting photo:", err);
      });
      fs.unlink(home.rulesPdf, (err) => {
        if (err) console.log("Error deleting PDF:", err);
      });
      return home.delete();
    })
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log("Error while deleting home:", err);
      res.redirect("/host/home-list");
    });
};
