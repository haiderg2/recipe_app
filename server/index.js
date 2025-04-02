const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const recipeRoutes = require('./routes/recipes');
const db = require('./db'); // MySQL connection


// Load environment variables from .env
dotenv.config();

// Initialize Koa app
const app = new Koa();
app.use(bodyParser());

// Test database connection
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ Connected to MySQL Database');
  } catch (err) {
    console.error('❌ Failed to connect to DB', err);
  }
})();

// Use routes
app.use(recipeRoutes.routes()).use(recipeRoutes.allowedMethods());

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
