'use strict';

const express = require('express');
const router = express.Router();
const logger = require('./../middleware/logger');
const authentication = require('../middleware/authentication');



// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', logger, authentication, async (request, response) => {
  try {
    response.status(200).send(request.body);
  } catch (e) {
    console.log(e);
    response.status(403).send('Error logging in');
  }
});

module.exports = router;