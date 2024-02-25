// Imports --------------------------------------------

const express = require("express");
const router = express.Router();
const db = require("../models/models");
const fs = require("fs");
const path = require("path");
const { render } = require("ejs");
const { sql } = require("googleapis/build/src/apis/sql");

// ----------------------------------------------------

router.get("/", (req, res) => {
  const storyInfo = async function () {
    const resultFromQuery = await new Promise((resolve, reject) => {
      db.query("SELECT story_name FROM stories", (err, result) => {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(result);
        }
      });
    });
    return resultFromQuery;
  };

  storyInfo()
    .then((result) => {
      console.log(
        "db connection successfully made inn stories-routes --> get route '/' <---"
      );
      res.render("stories", { result: result });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

// Utility function for making this db query async --------------------------------------------------------->
// async function executeQuery(sql_query, values) {
//   return new Promise((resolve, reject) => {
//     db.query(sql_query, values, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   });
// }

router.get("/select-story", (req, res) => {
  const selectedStory = req.query.story_name;
  const sql_query = "SELECT story_name, story_data FROM stories";

  const storyInfo = async function () {
    const result = await new Promise((resolve, reject) => {
      db.query(sql_query, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        } else if (rows) {
          for (let i = 0; i < rows.length; i++) {
            let current_story_name = rows[i].story_name;

            if (current_story_name == selectedStory) {
              resolve(rows[i]);
              break;
            }
          }
        }
      });
    });
    return result;
  };

  storyInfo()
    .then((result) => {
      res.render("article-template", { storyInfo: result });
    })
    .catch((error) => {
      console.error("Error logging INFO FROM DB CALL:", error);
    });
});

router.post("/add-story", (req, res) => {
  const textBody = req.body.textArea;
  const storyName = req.body.storyName;
  console.log(storyName);
  console.log(textBody);
  const containsNonSpace = /\S/.test(textBody);

  if (!containsNonSpace) {
    // textBody contains non-space characters
    console.log("Story must contain text");
    res.render("admin.ejs");
  }

  const sql_query =
    "INSERT INTO stories (story_name, story_data) VALUES (?, ?)";
  const insert_values = [storyName, textBody];

  db.query(sql_query, insert_values, async (err, result) => {
    if (err) {
      console.log(err);
    } else if (result) {
      console.log(result);
    }
  });
  res.redirect("/");
});

module.exports = router;
