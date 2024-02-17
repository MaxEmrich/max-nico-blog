const express = require("express");
const router = express.Router();
const db = require("../models/models");
const { render } = require("ejs");
const { text } = require("body-parser");
const config = require("./config/env_config");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/submit-login", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;

  if (username == login_info.username && password == login_info.password) {
    res.render("admin");
  } else {
    console.log("wrong username or password");
    res.redirect("/");
  }
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

//console.log(db);

module.exports = router;
