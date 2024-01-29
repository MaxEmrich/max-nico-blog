const express = require("express");
const router = express.Router();
const db = require("../models/models");
const fs = require("fs");
const path = require("path");
const { file } = require("googleapis/build/src/apis/file");

router.get("/", (req, res) => {
  res.render("stories");
});

router.get("/display-stories/:id", (req, res) => {
  const fileId = req.params.id;
  const query = "SELECT story_data FROM stories_table WHERE id = ?";
  db.query(query, [fileId], (err, results) => {});
});

module.exports = router;
