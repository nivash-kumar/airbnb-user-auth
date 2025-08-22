const User = require("../models/authModels");

// Renders login page
exports.getLogin = (req, res) => {
    res.render("authentication/login", {
        pageTitle: "Login to Airbnb",
        currentPage: "login"
    });
};

// Renders signup page
exports.getSignup = (req, res) => {
    res.render("authentication/signup", {
        pageTitle: "User SignUp",
        currentPage: "signup"
    });
};

// Handles signup form
exports.postSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const [user] = await user.findByEmail(email);
        if (user.length > 0) {
            return res.send("Email already exists. Try another.");
        }
        await User.create(name, email, password);
        res.redirect("/login");
    } catch (err) {
        console.error("Error is :::::", err);
        res.send("Error during signup.");
    }
};

// Handles login form
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await User.findByEmail(email);
        if (user.length === 0) {
            return res.send("No user found with this email.");
        }
        if (user[0].password !== password) {
            return res.send("Incorrect password.");
        }
        // Login (session logic here)
        req.session.user = user;
        res.redirect("/");
    } catch (err) {
        console.error("Error is :::::", err);
        res.send("Error during login.");
    }
};

exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};
