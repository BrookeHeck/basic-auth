'use strict';

const { app } = require('./../src/server');
const supertest = require('supertest');
const { db } = require('./../src/models');
const bcrypt = require('bcrypt');

const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});

describe('Should correctly handle the POST /signup route', () => {
  test('Should sign up a user when given a username and password', async () => {
    let response = await request.post('/signup')
      .send({username: 'john', password: 'foo'})
      .catch(e => console.log(e));
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('john');
    expect(await bcrypt.compare('foo', response.body.password)).toBeTruthy();
  });
  test('Should not sign up a user if not given a username and password', async () => {
    let response = await request.post('/signup');
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({});
  });
});

describe('Should correctly handle the POST /signin route', () => {
  test('Should sign in an existing user only if correct credentials are provided', async () => {
    let response = await request.post('/signin')
      .auth('john', 'foo')
      .catch(e => console.log(e));
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('john');
    expect(await bcrypt.compare('foo', response.body.password)).toBeTruthy();
  });
  test('Should not sign in a user if wrong credentials are provided', async () => {
    let response = await request.post('/signin')
      .auth('john', 'password')
      .catch(e => console.log(e));
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({});
  });
});

describe('Testing the error handling of server', () => {
  test('Should respond with a 404 for incorrect method', async () => {
    const response = await request.get('/signin');
    expect(response.status).toEqual(404);
  });
});