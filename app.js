//Core modules
const path = require("path");

//External modules...
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { default: mongoose } = require("mongoose");
const multer = require("multer");

// Load environment variables
require('dotenv').config();

const DB_PATH = process.env.MONGODB_URI || "mongodb+srv://SinghKN:singhknwork@singhkn.v0hajwv.mongodb.net/airbnb?retryWrites=true&w=majority&appName=singhKn";
const SESSION_SECRET = process.env.SESSION_SECRET || "This page is dedicated to SinghKN";
const PORT = process.env.PORT || 8000;

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
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, "uploads/images");
    } else if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/docx" ||
      file.mimetype === "application/txt"
    ) {
      cb(null, "uploads/pdfs");
    } else {
      cb(null, "uploads/others"); // Fallback for other file types
    }
  },
  filename: (req, file, cb) => {
    // cb(null, new Date().toISOString() + "-" + file.originalname);
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else if (
    file.mimetype === "application/pdf" || // .doc
    file.mimetype === "application/docx" || // .docx
    file.mimetype === "text/txt"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOption = {
  storage,
  fileFilter,
};

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));
// app.use(multer(multerOption).single("photo"));
app.use(multer(multerOption).any());
// app.use(multer(multerOption).array("photo"));
// app.use(multer(multerOption).array("rulesPdf"));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  next();
});

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

//// Uses our routers
app.use(authRouter);
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(errorController.pageNotFound);

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Mongoose Connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT >> http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error While connecting Mongoose:", err);
  });
