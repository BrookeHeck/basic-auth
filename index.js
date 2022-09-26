'use strict';

const { db } = require('./src/models');
const { start } = require('./src/server');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

db.sync()
  .then(() => start(PORT))
  .catch((e) => console.log(e));

