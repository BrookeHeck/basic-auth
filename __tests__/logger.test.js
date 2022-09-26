const logger = require('../src/middleware/logger');

describe('testing logger', () => {
  test('Should log something when invoked', () => {
    jest.spyOn(console, 'log');
    const request = {
      method: 'TEST',
      path: 'TEST',
      query: 'TEST',
    };
    const response = {};
    const next = jest.fn();
    logger(request, response, next);
    expect(console.log).toHaveBeenCalledWith(`${request.method} ${request.path}`);
  });
});