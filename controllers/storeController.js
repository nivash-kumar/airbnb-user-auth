const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/index', {
      registeredHomes: registeredHomes, pageTitle: 'airbnb Index', currentPage: 'index'
    });
  });

};
// get home
exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/home-list', {
      registeredHomes: registeredHomes, pageTitle: 'Listed Homes', currentPage: 'homes'
    });
  });

};

exports.getBookings = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('store/bookings', {
      registeredHomes: registeredHomes, pageTitle: 'My Bookings', currentPage: 'bookings'
    });
  });

};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favouriteIds) => {
    if (favouriteIds.length === 0) {
      // No favourites, render empty list
      res.render('store/favourite-list', {
        registeredHomes: [],
        pageTitle: 'My Favourites',
        currentPage: 'favourites'
      });
      return;
    }

    // Get all homes and filter by favourite IDs
    Home.fetchAll((allHomes) => {
      const favouriteHomes = allHomes.filter(home => 
        favouriteIds.includes(home.id)
      );
      
      res.render('store/favourite-list', {
        registeredHomes: favouriteHomes,
        pageTitle: 'My Favourites',
        currentPage: 'favourites'
      });
    });
  });
};

exports.postAddFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.homeId, (error, alreadyExists) => {
    if (error) {
      console.log("Error while marking favourite");
    } else if (alreadyExists) {
      console.log("Home already in favourites"); 
    } else {
      console.log("Successfully added to favourites");
    }
    res.redirect("/favourites");
  });
};  

exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, home => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render('store/home-detail', {
        pageTitle: 'Home Detail', currentPage: 'home', home: home
      });
    }
  });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    };
    res.redirect("/favourites");
  });
};