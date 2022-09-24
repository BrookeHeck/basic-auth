'use strict';

const send500 = (error, request, response) => {
  console.log(error);
  response.status(500).send(error);
};

module.exports = send500;