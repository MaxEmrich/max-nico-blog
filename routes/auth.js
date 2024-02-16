const express = require("express");
const router = express.Router();
const db = require("../models/models");

router.get("/", (req, res) => {
  res.send("auth page");
});

module.exports = router;
