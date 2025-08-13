//Core modules
const path = require("path");

//External module...
const express = require("express");


//Local Module....
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errorController")

const app = express();
app.set('view engine', 'ejs');
app.set('views', "views");

app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use(express.urlencoded());
//// Uses our Routers
app.use(storeRouter);
app.use("/host", hostRouter);
app.use(express.static(path.join(rootDir, 'public')));


///always add 404 routes in the bottom of the code
app.use(errorController.pageNotFound);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on address http://localhost:${port}`);
});
