module.exports = (app) => {
  require("./src/routes/player")(app);
  require("./src/routes/other")(app);
  require("./src/routes/articles")(app);
};
