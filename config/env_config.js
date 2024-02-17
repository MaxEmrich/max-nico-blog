const dotenv = require("dotenv");

dotenv.config();
const config = {
  env: process.env["ACCEPTED_ADMIN_REGISTRATION_EMAIL_1"] ?? "NULL",
};

module.exports = config;
