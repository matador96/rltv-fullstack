module.exports = (app) => {
  // Users
  require("./src/routes/article")(app);
  require("./src/routes/module")(app);
};
