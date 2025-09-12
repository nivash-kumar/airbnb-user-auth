//Core modules
const path = require("path");

//External modules...
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_PATH ="mongodb+srv://SinghKN:singhknwork@singhkn.v0hajwv.mongodb.net/airbnb?retryWrites=true&w=majority&appName=singhKn";
const { default: mongoose } = require("mongoose");
const multer = require("multer");

//Local Module....
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errorController");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",

});

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i< length; i++){
    result += characters.charAt(Math.floor(Math.random()* characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString() + "-" + file.originalname);
    cb(null, randomString(10) + "-" + file.originalname);
  }
});
const fileFilter = (req, file, cd) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
    cd(null, true);
  }else{
    cd(null, false);
  }
}
const multerOption = {
  storage, fileFilter
}


app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));
app.use(multer(multerOption).single("photo"));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

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
