const mode = process.env.NODE_ENV || "development";
require("dotenv").config();

const config = {
  development: {
    port: "3003",
  },
  production: {
    port: process.env.SERVER_PORT || 3044,
  },
};

module.exports = config[mode];
