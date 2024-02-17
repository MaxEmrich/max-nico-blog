const dotenv = require("dotenv");
dotenv.config();
const config = {
  ACCEPTED_ADMIN_REGISTRATION_EMAIL_1:
    process.env["ACCEPTED_ADMIN_REGISTRATION_EMAIL_1"] ?? "NULL",
  SESSION_KEY: process.env["SESSION_KEY"] ?? "DEFAULT_SESSION_KEY",
};

module.exports = config;
