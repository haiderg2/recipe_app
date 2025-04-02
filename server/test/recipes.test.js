const request = require('supertest');
const expect = require('chai').expect;
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const recipeRoutes = require('../routes/recipes');

const app = new Koa();
app.use(bodyParser());
app.use(recipeRoutes.routes()).use(recipeRoutes.allowedMethods());

describe('Recipes API', () => {
  it('should return an array (GET /recipes)', async () => {
    const res = await request(app.callback()).get('/recipes');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return 404 for missing recipe (GET /recipes/:id)', async () => {
    const res = await request(app.callback()).get('/recipes/9999');
    expect(res.status).to.equal(404);
  });
});
