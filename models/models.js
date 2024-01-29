const mysql = require("mysql2");

// Create a connection pool
const db = mysql.createConnection({
  host: "localhost",
  user: "app_user",
  password: "Maxmadeit1",
  database: "node_app_database",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

// Export the pool
module.exports = db;
