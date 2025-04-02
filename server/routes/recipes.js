const Router = require('koa-router');
const router = new Router();
const recipeController = require('../controllers/recipes');

// Route: GET /recipes
router.get('/recipes', recipeController.getAll);

module.exports = router;
