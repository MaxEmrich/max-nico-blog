const express = require("express");
const router = express.Router();
const db = require("../models/models");
const fs = require("fs");
const path = require("path");
const { file } = require("googleapis/build/src/apis/file");

router.get("/", (req, res) => {
  res.render("stories");
});

router.get("/display-stories/:id", (req, res) => {});

module.exports = router;
