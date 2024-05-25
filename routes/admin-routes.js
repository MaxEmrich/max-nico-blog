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
initializePassport(passport, async (email) => {
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
});

router.use(
  session({
    secret: session_key,
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());

// ----------------------------------------------------------------------------------

router.get("/", checkAuthenticated, (req, res) => {
  function makeDbQuery() {
    return new Promise((resolve, reject) => {
      db.query("SELECT story_name, id FROM stories", (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else if (result) {
          resolve(result);
        }
      });
    });
  }

  async function renderResults() {
    const resultsFromQuery = await makeDbQuery();
    res.render("admin", { storyInfo: resultsFromQuery });
  }

  renderResults();
});

router.get("/goto-admin-register", (req, res) => {
  res.render("register-admin");
});

router.get("/goto-admin-login", (req, res) => {
  res.render("login-admin");
});

router.post("/remove-article", checkAuthenticated, (req, res) => {
  const storyId = req.body.storyId;

  function makeDbQuery() {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM stories WHERE id = ?", [storyId], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else if (result) {
          resolve(result);
        }
      });
    });
  }

  async function renderResults() {
    const resultsFromQuery = await makeDbQuery();
    console.log(resultsFromQuery);
    res.redirect("back");
  }

  renderResults();
});

router.post("/edit-article", (req, res) => {
  const storyId = req.body.storyId;
  function dbQuery() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT story_data, story_name FROM stories WHERE id = ?",
        [storyId],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else if (result) {
            resolve(result);
          }
        }
      );
    });
  }
  dbQuery()
    .then((result) => {
      console.log(result);
      res.render("editing-template", {
        storyData: result[0],
        storyId: storyId,
        storyName: result[0].story_name,
      });
    })
    .catch((err) => {
      res.send(`error ${err}`);
    });
});

router.post("/submit-article-edit", (req, res) => {
  const storyData = req.body.textInput;
  const storyId = req.body.storyId;
  const storyName = req.body.storyNameInput;
  console.log(typeof storyData);
  console.log(storyData);
  console.log(storyId);
  console.log(storyName);

  db.query(
    "UPDATE stories SET story_data = ?, story_name = ? WHERE id = ?",
    [storyData, storyName, storyId],
    (err, result) => {
      if (err) {
        console.log("ERROR! Could not update record... \n\n ->" + err);
        return err;
      } else if (result) {
        console.log(`Success! -> \n ${result.affectedRows}`);
        res.render("../index");
      }
    }
  );
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
  res.render("../index");
}

module.exports = router;
