const db = require('../db');

exports.getAll = async (ctx) => {
  try {
    const [rows] = await db.query('SELECT * FROM recipes');
    ctx.body = rows;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch recipes' };
  }
};


exports.create = async (ctx) => {
  try {
    const { title, description, prep_time, cook_time, instructions } = ctx.request.body;

    if (!title || !description || !instructions) {
      ctx.status = 400;
      ctx.body = { error: 'Missing required fields' };
      return;
    }

    const [result] = await db.query(
      'INSERT INTO recipes (title, description, prep_time, cook_time, instructions) VALUES (?, ?, ?, ?, ?)',
      [title, description, prep_time, cook_time, instructions]
    );

    ctx.status = 201;
    ctx.body = { message: 'Recipe created', id: result.insertId };
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: 'Failed to create recipe' };
  }
};
