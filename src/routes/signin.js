'use strict';

const express = require('express');
const router = express.Router();
const logger = require('./../middleware/logger');
const authentication = require('./../../auth/authentication');
const bcrypt = require('bcrypt');
const { Users } = require('./../models');


// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post('/signup', logger, async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).send(record);
  } catch (e) {
    console.log(e);
    res.status(403).send('Error Creating User');
  }
});

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', logger, authentication, async (request, response) => {
  try {
    response.status(200).send(request.body);
  } catch(e) {
    console.log(e);
    response.status(403).send('Error logging in');
  }
});

module.exports = router;