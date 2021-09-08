const OtherController = require("../controllers/other");

module.exports = (router) => {
  router.get("/api/other/configs", OtherController.getSiteConfigs);
  router.get("/api/other/lastsearchers", OtherController.getLastSearchers);
  router.get(
    "/api/other/rankdistribution",
    OtherController.getRankDistribution
  );
  router.get("/api/sitemap", OtherController.getSitemap);
};
