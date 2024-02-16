// Imports --------------------------------------------

const express = require("express");
const router = express.Router();
const db = require("../models/models");
const fs = require("fs");
const path = require("path");
const { render } = require("ejs");

// ----------------------------------------------------

router.get("/", (req, res) => {
  db.query("SELECT story_name FROM stories", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.render("stories", { result: result });
  });
});

router.get("/select-story", (req, res) => {
  const selectedStory = req.query.story_name;
  console.log("the route is being called successfully");
  res.render("article-template", { storyInfo: selectedStory });
});

module.exports = router;
