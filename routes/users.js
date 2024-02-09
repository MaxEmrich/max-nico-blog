const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/user", (req, res) => {
  res.send("Users");
  console.log("log");
});

module.exports = router;
