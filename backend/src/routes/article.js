const ArticleController = require('../controllers/article');

module.exports = (router) => {
    router.get('/api/article/:id', ArticleController.validate('getArticleById'), ArticleController.getArticleById);
};
