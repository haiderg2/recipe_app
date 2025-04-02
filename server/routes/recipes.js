const Router = require('koa-router');
const router = new Router();
const recipeController = require('../controllers/recipes');

router.get('/recipes', recipeController.getAll);
router.post('/recipes', recipeController.create);

router.get('/recipes/:id', recipeController.getOne);


module.exports = router;
