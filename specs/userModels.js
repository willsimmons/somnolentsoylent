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
  describe('add User', function() {
    it('should add a new user to the database', function(done) {
      userModel.addUser(testUser)
      .then( () => {
        return User.findOne({'email': 'test@test.com'}).exec()
      })
      .then( (user) => {
        expect(user.email).to.equal('test@test.com');
        done();
      });
    });
    it('should return TODOBLANKBLANK when email already exists', function(done) {
      userModel.addUser(testUser)
      .then( () => {
        return User.findOne({'email': 'test@test.com'}).exec()
      })
      .then( (user) => {
        console.log(user);
        expect(user.email).to.equal('test@test.com');
        done();
      });
    });
  });
});