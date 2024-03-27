const { render } = require("ejs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("about-us.ejs");
});

module.exports = router;
