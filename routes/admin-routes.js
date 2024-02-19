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
// ----------------------------------------------------------------

// Pre-config -----------------------------------------------------
const AVAILABLE_EMAIL = config.ACCEPTED_ADMIN_REGISTRATION_EMAIL_1;
const session_key = config.SESSION_KEY;
initializePassport(
  passport,
  async (email) => {
    let user_data = null;
    try {
      user_data = await new Promise((resolve, reject) => {
        db.query(
          "SELECT id, admin_email, admin_password FROM admin_users",
          (err, result, fields) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });

      for (user of user_data) {
        if (user.admin_email == email) {
          return user; // Return the entire user object
        }
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  } // --------------------------------------------------------------------------->
  //   async (id) => {
  //     let user_data = null;
  //     try {
  //       user_data = new Promise((resolve, reject) => {
  //         db.query(
  //           "SELECT id, admin_email, admin_password FROM admin_users",
  //           (err, result, fields) => {
  //             if (err) {
  //               console.log(err);
  //               reject(err);
  //             } else {
  //               resolve(result);
  //             }
  //           }
  //         );
  //       });

  //       for (user of user_data) {
  //         if (user.id == id) {
  //           return user; // Return the entire user object
  //         }
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       return null;
  //     }
  //     return 0;
  //   }
);

router.use(
  session({
    secret: session_key,
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());
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

// Admin LOGIN & REGISTER routes ----------------------------------------->

router.post(
  "/admin-login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/admin/goto-admin-login",
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
  } catch (err) {
    console.log(`ERROR! ERROR! ERROR! --> ${err}`);
  }
  return 0;
});

// --------------------------------------------------------------------------------------------------->

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("attempted to go to admin page without being logged in");
  res.render("index");
}

module.exports = router;
