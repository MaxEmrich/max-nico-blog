// Imports ------------------------------------------------

const express = require("express");
const app = express();
const path = require("path");
const db = require("./models/models");
const passport = require("passport");
const flash = require("express-flash");
const multer = require("multer");
const bodyParser = require("body-parser");
const session = require("express-session");
const render = require("ejs");
const initializePassport = require("./passport-config");
const methodOverride = require("method-override");
const storiesRoute = require("./routes/stories-routes");
const adminRoute = require("./routes/admin");

// ---------------------------------------------------------

// "Use" is for middleware ---------------------------------

const publicPath = path.join(__dirname, "public");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/stories-routes", storiesRoute);
app.use("/admin", adminRoute);
app.use(
  express.static(publicPath, {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// ------------------------------------------------------

// Get request for the entry point of app
// Home page
app.get("/", (req, res) => {
  res.render("index");
});
