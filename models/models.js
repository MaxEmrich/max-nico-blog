const mysql = require("mysql2");

// Create a connection pool
const db = mysql.createConnection({
  host: "sql3.freesqldatabase.com",
  user: "sql3682952",
  password: "E8iWZDJMvX",
  database: "sql3682952",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

// Export the pool
module.exports = db;
