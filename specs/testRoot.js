var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');

before(function() {
  mongoose.connect('mongodb://localhost/semblyTest');	
})
