const Router = require('koa-router');
const router = new Router();
const recipeController = require('../controllers/recipes');
const auth = require('../middleware/auth');


router.get('/recipes', recipeController.getAll);
router.get('/recipes/:id', recipeController.getOne);

router.post('/recipes', auth, recipeController.create);
router.patch('/recipes/:id', auth, recipeController.patch);
router.delete('/recipes/:id', auth, recipeController.delete);

router.get('/recipes/:id/ingredients', recipeController.getIngredients);
router.post('/recipes/:id/ingredients', auth, recipeController.addIngredient);
router.delete('/ingredients/:id', auth, recipeController.deleteIngredient);




module.exports = router;
