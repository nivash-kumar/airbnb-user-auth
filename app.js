//Core modules
const path = require("path");

//External modules...
const express = require("express");
require('dotenv').config();


//Local Module....
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const contactinfoRouter = require("./routes/contactInfoRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errorController");


const app = express();
app.set('view engine', 'ejs');
app.set('views', "views");

app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use(express.urlencoded());
//// Uses our routers
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(contactinfoRouter);
app.use(express.static(path.join(rootDir, 'public')));


///always add 404 routes in the bottom of the code
app.use(errorController.pageNotFound);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
});
