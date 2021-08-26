const OtherController = require("../controllers/other");

module.exports = (router) => {
  router.get("/api/other", OtherController.getSiteConfigs);
};
