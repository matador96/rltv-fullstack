const mode = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: "3003",
  },
  production: {
    port: process.env.SERVER_PORT || 8080,
  },
};

module.exports = config[mode];
