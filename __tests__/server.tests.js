'use strict';

const { app } = require('./../src/server');
const supertest = require('supertest');
const { Users, db } = require('./../src/models');
const bcrypt = require('bcrypt');

const request = supertest(app);

beforeAll(async () => {
  await db.sync();
  await request.post('/signup').send({
    username: 'john',
    password: 'foo',
  });
});

describe('Should correctly handle the POST /signup route', () => {
  test('Should sign up a user when given a username and password', async () => {
    let response = await request.post('/signup').send({username: 'john', password: 'foo'}).catch(e => console.log(e));
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('john');
    expect(await bcrypt.compare('foo', response.body.password)).toBeTruthy();
  });
  test('Should not sign up a user if not given a username and password');
});