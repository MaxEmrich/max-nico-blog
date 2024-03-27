const express = require("express");
const router = express.Router();
const { render } = require("ejs");

router.get("/", (req, res) => {
  res.render("about-us");
});

module.exports = router;
