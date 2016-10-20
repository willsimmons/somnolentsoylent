var chai = require('chai');
var expect = chai.expect;
var User = require('../server/schemas/userSchema.js');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.Promise = bluebird;


describe('User Schema', function() {

  describe('User Schema', function() {
    it('schema should have properties id, firstName, lastName, email, password, salt, friends, requests, saved, hosting, photoUrl', function() {
      expect(User.schema.obj).to.have.all.keys(['id', 'firstName', 'lastName', 'email', 'password', 'salt', 'friends', 'requests', 'saved', 'hosting', 'photoUrl']);
    });
  });

  describe('Password Encryption', function(){
    
    var currentUser = null;

  

    afterEach(function(done){
      //clear the user database
      User.remove({}, function(err){
        console.log('collection removed');
      });

      done();
    });

    it('registers a new user with encrypted password', function(){
      var stringPassword = 'dropItLikeItsHot';
      var newTestUser = new User({
        firstName: 'Snoop',
        lastName: 'Dogg',
        email: 'foshizzle@dogg.com',
        password: 'dropItLikeItsHot',
      });


      newTestUser.save().then(function(newUser){
        expect(newUser.password).to.not.equal(stringPassword)
      });

      // console.log('wutttt');

      // User.find({}, function(err, users){
      //   if(err){
      //     console.log(err);
      //   } else {
      //     console.log(users);
      //   }
      // })
    });
  });
});


//User Schema
// id: Schema.Types.ObjectId,
//   firstName: {
//     type: String,
//     required: true
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   salt: String,
//   friends: [Schema.ObjectId, ref: 'User'],
//   requests: [Schema.ObjectId, ref: 'User'],
//   saved: [Schema.Types.ObjectId, ref:'Event'],
//   hosting: [Schema.Types.ObjectId, ref:'Event'],
//   photoUrl: String