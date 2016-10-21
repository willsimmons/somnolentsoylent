var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var request = require('supertest');
var userController = require('../server/controllers/userController');
var userModels = require('../server/models/userModels');
var User = require('../server/schemas/userSchema');
var mongoose = require('mongoose');
var app = require('../server/server');

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}

describe('User Controller', function() {
  describe('signUp', function() {
    before(function(done){
      sinon.spy(userModels, 'addUser');
      User.remove({}).exec()
      .then(function(){
        done();
      })
    })
    after(function(){
      userModels.addUser.restore();
    })
    it('should return a 301 with a success', function(done) {
      request(app)
          .post('/api/users/signup')
          .send(testUser)
          .expect(201)
          .end(done);
    });
    it('should call userModel.addUser', function() {
      expect(userModels.addUser.calledOnce).to.equal(true);
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