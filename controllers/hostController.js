// const { clear } = require("console");
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

exports.postAddHome =async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId);

  if (!req.files || req.files.length === 0) {
    console.log("No file uploaded in right format ");
    return res.status(422).render("host/edit-home", {
      pageTitle: "Add Home to airbnb",
      currentPage: "addHome",
      editing: false,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
      errors: ["Please upload both image and PDF files"],
    });
  }
  const { houseName, ownerName, price, city, address, rating, description } =
    req.body;

  const photo = [];
  const rulesPdf = [];
  req.files.forEach((el) => {
    if (el.fieldname === "photo") {
      photo.push(el.path);
    } else if (el.fieldname === "rulesPdf") {
      rulesPdf.push(el.path);
    }
  });
  if (photo.length === 0) {
    return res.status(422).render("host/edit-home", {
      pageTitle: "Add Home to airbnb",
      currentPage: "addHome",
      editing: false,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
      errors: ["Image file is required"],
    });
  }

  const home = new Home({
    houseName,
    ownerName,
    price,
    city,
    address,
    rating,
    description,
    photo: photo[0],
    rulesPdf: rulesPdf[0],
  });
  home
    .save()
    .then((savedHomes) => {
      user.hostedHomes.push(savedHomes._id);
      return user.save();
    })
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      return res.status(500).render("host/edit-home", {
        pageTitle: "Add Home to airbnb",
        currentPage: "addHome",
        editing: false,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
        errors: ["Error saving home. Please try again."],
      });
    });
};

exports.getHostHomes = async (req, res, next) => {
  const userId = req.session.user._id;
  const user =await User.findById(userId).populate("hostedHomes");
    res.render("host/host-home-list", {
      registeredHomes: user.hostedHomes,
      pageTitle: "Host-Home",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
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
      home.description = description;

      if (req.files) {
        req.files.forEach((el) => {
          if (el.fieldname === "photo") {
            if (home.photo) {
              fs.unlink(home.photo, (err) => {
                if (err) console.log("ERROR WHILE UPDATING IMAGE FILE", err);
              });
            }
            photo.push(el.path);
          } else if (el.fieldname === "rulesPdf") {
            if (home.rulesPdf) {
              fs.unlink(home.rulesPdf, (err) => {
                if (err) console.log("ERROR WHILE UPDATING PDF FILE", err);
              });
            }
            rulesPdf.push(el.path);
          }
        });

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

exports.postDeleteHome = async (req, res, next) => {
  const userId = req.session.user._id;
  const homeId = req.params.homeId;

  await User.findByIdAndUpdate(
    userId,
    { $pull: { hostedHomes: homeId } },
    { new: true }
  );

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found");
        return res.redirect("/host/home-list");
      }

      const deletePromises = [];

      if (home.photo && home.photo.trim() !== "") {
        deletePromises.push(
          new Promise((resolve) => {
            fs.unlink(home.photo, (err) => {
              if (err) {
                console.log("Error deleting photo:", err.message);
              }
              resolve();
            });
          })
        );
      }

      if (home.rulesPdf && home.rulesPdf.trim() !== "") {
        deletePromises.push(
          new Promise((resolve) => {
            fs.unlink(home.rulesPdf, (err) => {
              if (err) {
                console.log("Error deleting PDF:", err.message);
              }
              resolve();
            });
          })
        );
      }

      return Promise.all(deletePromises).then(() => {
        return home.deleteOne();
      });
    })
    .then(() => {
      console.log("Home deleted successfully");
      return User.updateMany(
        { $or: [ { favourites: homeId }, { hostedHomes: homeId } ] },
        { $pull: { favourites: homeId, hostedHomes: homeId } }
      );
    })
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log("Error while deleting home:", err);
      res.redirect("/host/home-list");
    });
};