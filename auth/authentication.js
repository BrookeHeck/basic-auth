'use strict';

const authentication = (request, response, next) => {
  console.log('authenticated');
  next();
};

module.exports = authentication;