'use strict';

const express = require('express');
const router = express.Router();
const logger = require('../middleware/logger');
const bcrypt = require('bcrypt');
const { Users } = require('../models');


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

module.exports = router;