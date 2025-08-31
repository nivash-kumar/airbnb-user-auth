//Core modules
const path = require("path");

//External modules...
const express = require("express");
const { default: mongoose } = require("mongoose");

//Local Module....
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errorController");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use((req, res, next) => {
  console.log("cookie check middleware", req.get("cookie"));
  req.isLoggedIn = req.get("cookie")
    ? req.get("cookie").split("=")[1] === "true"
    : false;
  next();
});
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

//// Uses our routers
app.use(express.static(path.join(rootDir, "public")));
app.use(authRouter);
app.use(storeRouter); 
app.use("/host",hostRouter); 

const port = 4000;
const DB_PATH ="mongodb+srv://SinghKN:singhknwork@singhkn.v0hajwv.mongodb.net/airbnb?retryWrites=true&w=majority&appName=singhKn";
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
