const Router = require('koa-router');
const router = new Router();
const recipeController = require('../controllers/recipes');

router.get('/recipes', recipeController.getAll);
router.post('/recipes', recipeController.create);

router.get('/recipes/:id', recipeController.getOne);
router.delete('/recipes/:id', recipeController.delete);
router.patch('/recipes/:id', recipeController.patch);

router.get('/recipes/:id/ingredients', recipeController.getIngredients);
router.post('/recipes/:id/ingredients', recipeController.addIngredient);
router.delete('/ingredients/:id', recipeController.deleteIngredient);



module.exports = router;
