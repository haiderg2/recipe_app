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


const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJndWxmYW0iLCJpYXQiOjE3NDM2MTE0MjQsImV4cCI6MTc0MzYxODYyNH0.PiRPwj8v35XvI8Q2PHKKic-PJSXYYnAKAUrHsVIa1sE';

describe('Protected Recipes Routes', () => {
  it('should reject POST /recipes without token', async () => {
    const res = await request(app.callback())
      .post('/recipes')
      .send({
        title: 'Fake Dish',
        description: 'Should fail',
        prep_time: 5,
        cook_time: 10,
        instructions: 'Nope'
      });

    expect(res.status).to.equal(401);
  });

  it('should allow POST /recipes with valid token', async () => {
    if (!authToken) {
      console.log('\n⚠️  Skipping test: Add a real token to authToken variable\n');
      return;
    }

    const res = await request(app.callback())
      .post('/recipes')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Recipe',
        description: 'Created via test',
        prep_time: 15,
        cook_time: 30,
        instructions: 'Test instructions'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });
});
