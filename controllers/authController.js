exports.getLogin = (req, res, next) => {
  res.render("auth/login", 
    {
      pageTitle:"login",
      currentPage: "login",
      editing: false,
      isLoggedIn: false,
    }
  ) 
};
exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  req.session.save((err) => {
    if (err) {
      console.log("Error saving session:", err);
    } else {
      console.log("Session saved successfully");
      console.log("Final session state:", req.session);
    }
    res.redirect("/");
  });
}

exports.postLogout = (req, res, next) => {
  console.log("logout request",req.body);
  req.session.isLoggedIn = false;
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    }
    res.redirect("/login");
  });
}
