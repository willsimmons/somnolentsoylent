var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;

before(function(done) {
  mongoose.connect('mongodb://localhost/semblyTest');
  mongoose.connect.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connect.once('open', function callback () {
    console.log('test connection open');
    done();
  });
})
