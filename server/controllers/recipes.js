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

exports.getOne = async (ctx) => {
  try {
    const id = ctx.params.id;
    const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);

    if (rows.length === 0) {
      ctx.status = 404;
      ctx.body = { error: 'Recipe not found' };
      return;
    }

    ctx.body = rows[0];
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch recipe' };
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

exports.patch = async (ctx) => {
  try {
    const id = ctx.params.id;
    const { title, description, prep_time, cook_time, instructions } = ctx.request.body;

    // Build query dynamically based on provided fields
    let query = 'UPDATE recipes SET ';
    const fields = [];
    const values = [];

    if (title !== undefined) {
      fields.push('title = ?');
      values.push(title);
    }
    if (description !== undefined) {
      fields.push('description = ?');
      values.push(description);
    }
    if (prep_time !== undefined) {
      fields.push('prep_time = ?');
      values.push(prep_time);
    }
    if (cook_time !== undefined) {
      fields.push('cook_time = ?');
      values.push(cook_time);
    }
    if (instructions !== undefined) {
      fields.push('instructions = ?');
      values.push(instructions);
    }

    if (fields.length === 0) {
      ctx.status = 400;
      ctx.body = { error: 'No fields provided for update' };
      return;
    }

    query += fields.join(', ') + ' WHERE id = ?';
    values.push(id);

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      ctx.status = 404;
      ctx.body = { error: 'Recipe not found' };
      return;
    }

    ctx.body = { message: 'Recipe updated successfully' };
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: 'Failed to patch recipe' };
  }
};


exports.delete = async (ctx) => {
  try {
    const id = ctx.params.id;

    const [result] = await db.query('DELETE FROM recipes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      ctx.status = 404;
      ctx.body = { error: 'Recipe not found or already deleted' };
      return;
    }

    ctx.body = { message: 'Recipe deleted successfully' };
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete recipe' };
  }
};
