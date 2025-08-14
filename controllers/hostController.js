const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing : false,
  });
};

exports.postAddHome = (req, res, next) => {
  // console.log(`Home registration successful for: `, req.body, req.body.houseName);
  const { houseName, ownerName, price, city, address, rating, photoUrl, contectNumber } = req.body;
  // registeredHomes.push(req.body);
  const home = new Home(houseName, ownerName, price, city, address, rating, photoUrl, contectNumber)
  home.save();
  res.redirect('/host/home-list');
}

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render('host/host-home-list', {
      registeredHomes: registeredHomes,
      pageTitle: 'Host-Home', 
      currentPage: 'host-homes'
    });
  });
}


  exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';
    Home.findById(homeId, home =>{
      if(!home){
        console.log("Home not found");
        res.redirect("/host/home-list");
        return;
      };

      console.log(homeId, editing, home);
      res.render("host/edit-home", { //render sends html  and redirect sends url of page
        home : home,
        pageTitle: "Edit Home to airbnb",
        currentPage: "host-home",
        editing: editing,
      });
    });

  };

  exports.postEditHome = (req, res, next) => {
    // console.log(`Home registration successful for: `, req.body, req.body.houseName);
    const {id, houseName, ownerName, price, city, address, rating, photoUrl, contectNumber } = req.body;
    // registeredHomes.push(req.body);
    const home = new Home(houseName, ownerName, price, city, address, rating, photoUrl, contectNumber);
    home.id = id;
    home.save();
    res.redirect('/host/home-list');
  }


  exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log("Came to delete Home Id", homeId);
    Home.deleteById(homeId, error =>{
      if(error) {
        console.log("Enter while Deleting", error );
      }
      console.log(homeId);
    res.redirect('/host/home-list');
    }); 
  }