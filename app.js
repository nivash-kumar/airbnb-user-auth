//Core modules
const path = require("path");

//External modules...
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_PATH ="mongodb+srv://SinghKN:singhknwork@singhkn.v0hajwv.mongodb.net/airbnb?retryWrites=true&w=majority&appName=singhKn";

//Local Module....
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errorController");
const { default: mongoose } = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",

});


app.use(express.urlencoded());
app.use(session({
  secret: "This page is dedicated to SinghKN",
  resave: false,
  saveUninitialized: false,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
})

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

//// Uses our routers
app.use(express.static(path.join(rootDir, "public")));
app.use(authRouter);
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(errorController.pageNotFound);

const port = 8000;
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Mongoose Connected successfuly");
    app.listen(port, () => {
      console.log(`Server is running on PORT >> http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error While connecting Mongoose:", err);
  });
