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
exports.postLogin = (req,res,next) => {
  console.log(req.body);
  res.cookie("isLoggedIn",true);
  res.redirect("/");
};