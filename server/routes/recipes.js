const Router = require('koa-router');
const router = new Router();
const recipeController = require('../controllers/recipes');

// Route: GET /recipes
router.get('/recipes', recipeController.getAll);
router.post('/recipes', recipeController.create);

module.exports = router;
