// Imports ------------------------------------------------

const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const multer = require("multer");
const bodyParser = require("body-parser");
const session = require("express-session");
const render = require("ejs");
const methodOverride = require("method-override");
const storiesRoute = require("./routes/stories-routes");
const adminRoute = require("./routes/admin-routes");
const authRoute = require("./routes/auth-routes");

// ---------------------------------------------------------

// "Use" is for middleware ---------------------------------

const publicPath = path.join(__dirname, "public");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRoute);
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
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// ------------------------------------------------------

// Get request for the entry point of app
// Home page

const PORT = 3000;
app.listen(3000, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`app is listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "index.ejs"));
});
