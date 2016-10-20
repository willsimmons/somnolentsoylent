var chai = require('chai');
var expect = chai.expect;
var userController = require('../server/controllers/userController');
var User = require('../server/schemas/userSchema');
var mongoose = require('mongoose');

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}

describe('User Controller', function() {
  beforeEach(function(done){
    User.remove({}).exec()
    .then(function(){
      done();
    })
  });

  describe('signUp', function() {
    it('should return a 301 with a success', function(done) {
      request(app)
          .post('/api/users/signup')
          .send(testUser)
          .expect(301)
          .end(done);
    });
    it('should add a user to the database', function(done) {
      User.findOne({'email':'test@test.com'}).exec()
      .then(function(user) {
        expect(user.email).to.equal('test@test.com');
        done();
      })
    });
    it('should return a 400 when email already exists', function(done) {
      request(app)
          .post('/api/users/signup')
          .send(testUser)
          .expect(400)
          .end(done);
    });
  });



  // describe('login', function(){
  //   it('should check if ')

  // });
});