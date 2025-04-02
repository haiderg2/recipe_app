const jwt = require('jsonwebtoken');

const SECRET = 'mysuperdupersecretsecretkey';

module.exports = async (ctx, next) => {
  const authHeader = ctx.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { error: 'Authorization header missing or invalid' };
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, SECRET);
    ctx.state.user = user;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid or expired token' };
  }
};
