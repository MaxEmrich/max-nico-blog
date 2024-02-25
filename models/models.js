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
const db = mysql.createPool({
  host: `${config.SQL_SERVER_IP}`,
  user: `${config.SQL_USERNAME}`,
  password: `${config.SQL_PASSWORD}`,
  database: "sql3682952",
  connectionLimit: 100,
});

// Connect to the database
db.getConnection((err) => {
  if (err) {
    console.log("ERROR here in the db connection stage");
    console.log(err);
  }
});

// Export the pool
module.exports = db;
