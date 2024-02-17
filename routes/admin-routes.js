// Imports -----------------------------------------------------
const express = require("express");
const router = express.Router();
const db = require("../models/models");
const { render } = require("ejs");
const { text } = require("body-parser");
const config = require("../config/env_config");
const bcrypt = require("bcrypt");
const initializePassport = require("../passport-config.js");
const passport = require("passport");
const session = require("express-session");
// --------------------------------------------------------------

// Pre-config -----------------------------------------------------
const session_key = config.SESSION_KEY;
console.log(session_key);
router.use(
  session({
    secret: session_key,
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const AVAILABLE_EMAIL = config.ACCEPTED_ADMIN_REGISTRATION_EMAIL_1;
// --------------------------------------------------------------------

router.get("/", checkAuthenticated, (req, res) => {
  res.render("admin");
});

router.get("/goto-admin-register", (req, res) => {
  res.render("register-admin");
});

router.get("/goto-admin-login", (req, res) => {
  res.render("login-admin");
});

router.post(
  "/admin-login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false,
  })
);

router.post("/admin-register", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (email !== AVAILABLE_EMAIL) {
    console.log(
      "user-given email and list of available admin emails do not match"
    );
    res.redirect("/");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const db_insert_query =
      "INSERT INTO admin_users (admin_name, admin_email, admin_password) VALUES (?, ?, ?)";
    const insert_values = [name, email, hashedPassword];
    db.query(db_insert_query, insert_values, (err, result) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else if (result) {
        console.log(result);
      }
      res.render("login-admin");
    });
  } catch (e) {
    console.log(`ERROR! ERROR! ERROR! --> ${e}`);
  }
  return 0;
});

router.post("/add-story", (req, res) => {
  const textBody = req.body.textArea;
  console.log(textBody);
  const containsNonSpace = /\S/.test(textBody);

  if (containsNonSpace) {
    // textBody contains non-space characters
    res.send("story added");
  } else {
    // textBody only contains spaces or is empty
    res.render("admin.ejs");
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("../index.ejs");
}

module.exports = router;
