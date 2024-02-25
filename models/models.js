const mysql = require("mysql2");
const config = require("../config/env_config");

// (async () => {
//   try {
//     const [results, metadata] = await sequelize.query("SELECT NOW()");
//     console.log(results);
//   } catch (err) {
//     console.error("error executing query:", err);
//   } finally {
//     await sequelize.close();
//   }
// })();

// Create a connection pool
const db = mysql.createConnection({
  host: `${config.SQL_SERVER_IP}`,
  user: `${config.SQL_USERNAME}`,
  password: `${config.SQL_PASSWORD}`,
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
