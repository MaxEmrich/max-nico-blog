const express = require("express");
const router = express.Router();
const db = require("../models/models");
const fs = require("fs");
const path = require("path");
const { file } = require("googleapis/build/src/apis/file");

router.get("/", (req, res) => {
  db.query("SELECT story_name FROM stories", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result[0].story_name);
    res.render("stories", { result: result });
  });
});

router.get("/select-story", (req, res) => {});

// router.get("/display-stories", (req, res) => {
//   db.query("SELECT story_name FROM stories", (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//     const name = result[0].story_name;
//     console.log(name);
//     res.render("article-template", { name: name });
//   });
// });

module.exports = router;
