const Router = require('koa-router');
const auth = require('../controllers/auth');

const router = new Router({ prefix: '/auth' });

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);


module.exports = router;
