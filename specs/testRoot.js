var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;

before(function() {
  mongoose.connect('mongodb://localhost/semblyTest');
})
