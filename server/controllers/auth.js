const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'mysuperdupersecretsecretkey';

exports.register = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Username and password required' };
    return;
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);
    ctx.status = 201;
    ctx.body = { message: 'User registered' };
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      ctx.status = 409;
      ctx.body = { error: 'Username already exists' };
    } else {
      ctx.status = 500;
      ctx.body = { error: 'Registration failed' };
    }
  }
};

exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;

  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

  if (rows.length === 0) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid credentials' };
    return;
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid credentials' };
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '2h' });
  ctx.body = { message: 'Login successful', token };
};
