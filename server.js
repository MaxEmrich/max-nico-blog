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
app.use("/stories-routes", storiesRoute);
app.use("/admin", adminRoute);

// initializePassport(passport, (email) => {
//   passport,
//     (email) => users.find((user) => user.email === email),
//     (id) => users.find((user) => user.id === id);
// });

const publicPath = path.join(__dirname, "public");

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
// app.use(passport.initialize());
// app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index");
});

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// app.post("/submit-form", (req, res) => {
//   const name = req.body.name;
//   console.log(`Got name: ${name}`);
//   const email = req.body.email;
//   console.log(`Got email: ${email}`);
//   const message = req.body.message;
//   console.log(`Got message: ${message}`);

//   db.query(
//     "INSERT INTO users_list (name, email, message) VALUES (?, ?, ?)",
//     [name, email, message],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(result);
//     }
//   );

//   res.redirect("/");
// });

const port_num = 3000;

app.listen(port_num, () => {
  console.log(`Server is running on port ${port_num}`);
});

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect("/");
//   }
//   next();
// }

// Other routes and middleware...

// app.get("/login", checkNotAuthenticated, (req, res) => {
//   res.render("login");
// });

// app.get("/register", checkNotAuthenticated, (req, res) => {
//   res.render("register");
// });

// app.post(
//   "/login",
//   passport.authenticate(
//     "local",
//     {
//       successRedirect: "/",
//       failureRedirect: "/login",
//       failureFlash: true,
//     },
//     checkNotAuthenticated
//   )
// );

// app.post("/register", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(request.body.password, 10);
//     // add the hashed password, username, and email to the database here -----
//     res.redirect("/login");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/register");
//   }
// });

// app.delete("/logout", (req, res) => {
//   req.logOut();
//   req.redirect("/login");
// });
