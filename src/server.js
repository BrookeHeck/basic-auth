'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const signin = require('./routes/signin');

const send404 = require('./error-handlers/404');
const send500 = require('./error-handlers/500');

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.get('/', (response, request) => response.status(200).send('Server'));
app.use(signin);
app.get('*', send404);
app.use(send500);

module.exports = {
  start: (port) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  },
  app,
};