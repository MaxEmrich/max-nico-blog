const dotenv = require("dotenv");
dotenv.config();
const config = {
  ACCEPTED_ADMIN_REGISTRATION_EMAIL_1:
    process.env["ACCEPTED_ADMIN_REGISTRATION_EMAIL_1"] ?? "NULL",
  SESSION_KEY: process.env["SESSION_KEY"] ?? "DEFAULT_SESSION_KEY",
  SQL_SERVER_IP: process.env["SQL_SERVER_IP"] ?? "NULL",
  SQL_USERNAME: process.env["SQL_USERNAME"],
  SQL_PASSWORD: process.env["SQL_PASSWORD"],
};

module.exports = config;
