const ArticlesController = require("../controllers/articles");

module.exports = (router) => {
  router.get("/api/articles/aboutme", ArticlesController.getAboutMe);
  router.get("/api/articles/donate", ArticlesController.getDonateList);
  router.get("/api/articles/roadmap", ArticlesController.getRoadmap);
  router.get("/api/articles/bugreport", ArticlesController.getBugReport);
};
