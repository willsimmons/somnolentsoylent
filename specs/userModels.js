var chai = require('chai');
var expect = chai.expect;
var userModels = require('../server/models/userModels');
var User = require('../server/schemas/userSchema');

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}

describe('User Models', function() {
  before(function(done){
    User.remove({}).exec()
    .then(function(){
      done();
    });
  });

  describe('add User', function() {
    it('should add a new user to the database', function(done) {
      userModels.addUser(testUser)
      .then( () => {
        return User.findOne({'email': 'test@test.com'}).exec()
      })
      .then(function(user) {
        expect(user.email).to.equal('test@test.com');
        done();
      });
    });
    it('should throw an error when email already exists', function(done) {
      userModels.addUser(testUser)
      .then(function() {
        return User.findOne({'email': 'test@test.com'}).exec()
      })
      .catch(function(error) {
        expect(error.message.includes('duplicate key error')).to.equal(true);
        done();
      });
    });
  });

  describe('login', function(){
    it('should retrieve the user if the passwords match', function(){
      userModels.login(testUser.email, testUser.password)
      .then(function(user){
        expect(user.firstName).to.equal('Test');
      })
    });
    it('should return false if the password is incorrect', function(){
      userModels.login(testUser.email, 'WAHHHPIZZAAWOOOO')
      .then(function(err) {
        expect(err).to.equal(false);
      })
    });
  });
});