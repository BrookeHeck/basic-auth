'use strict';

const send404 = (request, response) => {
  response.status(404).send('No route found');
};

module.exports = send404;