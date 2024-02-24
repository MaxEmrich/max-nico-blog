const mysql = require("mysql2");
const config = require("../config/env_config");

// Create a connection pool
const db = mysql.createConnection({
  host: `${config.SQL_SERVER_IP}`,
  user: `${config.SQL_USERNAME}`,
  password: `${config.SQL_PASSWORD}`,
  database: "node_app_database",
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
