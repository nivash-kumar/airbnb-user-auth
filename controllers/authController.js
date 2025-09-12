const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
exports.getSignup = (req, res, next) => {
  console.log("Signup called");
  res.render("auth/signup", {
    pageTitle: "signup",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "guest",
    },
    user: {},
  });
};

exports.postSignup = [
  check("userName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("User Name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name should contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password shold be atleast 6 characters long")
    .matches(/[a-zA-Z]/)
    .withMessage("Password shold be atleast one character")
    .matches(/[0-9]/)
    .withMessage("Password should be atleast one number")
    // .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?]/)
    // .withMessage("Password should be atleast one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("termsAndConditions")
    .notEmpty()
    .withMessage("Terms and conditions are required")
    .custom((value, { req }) => {
      if (value !== "on") {
        throw new Error("Please accept the terms and conditions");
      }
      return true;
    }),

  (req, res, next) => {
    const {
      userName,
      email,
      password,
      confirmPassword,
      userType,
      termsAndConditions,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("error >>>>", errors);
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: { userName, email, password, confirmPassword, userType },
        user: {},
      });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          userName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          currentPage: "signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { userName, email, userType },
          user: {},
        });
      });
  },
];

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    currentPage: "login",
    editing: false,
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {},
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["User does not exist"],
      oldInput: { email: email },
      user: {},
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: " login",
      isLoggedIn: false,
      errors: ["Invalid Password"],
      oldInput: { email },
      user: {},
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  console.log("logout request", req.body);
  req.session.isLoggedIn = false;
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    }
    res.redirect("/login");
  });
};
