const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');
const db = require('./db');


dotenv.config();

const app = new Koa();
app.use(bodyParser());

(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ Connected to MySQL Database');
  } catch (err) {
    console.error('❌ Failed to connect to DB', err);
  }
})();

app.use(recipeRoutes.routes()).use(recipeRoutes.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
