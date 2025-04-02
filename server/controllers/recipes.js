const db = require('../db');

// GET /recipes
exports.getAll = async (ctx) => {
  try {
    const [rows] = await db.query('SELECT * FROM recipes');
    ctx.body = rows;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch recipes' };
  }
};
