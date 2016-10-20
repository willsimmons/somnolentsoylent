var chai = require('chai');
var expect = chai.expect;
var userController = require('../server/controllers/userController');
var mongoose = require('mongoose');

describe('User Controller', function() {
  describe('signUp', function() {
    it('should add a new user to the database', function() {
      expect(true).to.equal(true);
    });
    it('should return TODOBLANKBLANK when email already exists', function() {
      expect(true).to.equal(true);
    });
  });
});