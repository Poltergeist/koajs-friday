/* global it, expect, describe */
var request = require('request');

describe('response with a index site', function() {
  it('should respond with hello world', function(done) {
    request('http://localhost:3000', function(error, response, body) {
        expect(body).toContain('hello world');
        expect(response.statusCode).toBe(200);
        done();
      });
  });
  it('should respond with not found', function(done) {
    request('http://localhost:3000/hello', function(error, response, body) {
        expect(body).toContain('Not Found');
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
