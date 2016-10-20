var chai = require('chai');
var expect = chai.expect;
var userController = require('../server/controllers/userController');
var mongoose = require('mongoose');

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}

describe('User Controller', function() {
  describe('signUp', function() {
    it('should add a new user to the database', function(done) {
      request(app)
          .post('/api/users/signup')
          .send(testUser)
          .expect(301)
          .end(done);
    });
    it('should return a 400 when email already exists', function(done) {
      request(app)
          .post('/api/users/signup')
          .send(testUser)
          .expect(400)
          .end(done);
    });
  });
});