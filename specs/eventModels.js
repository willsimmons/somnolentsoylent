// eventModels.js
var chai = require('chai');
var expect = chai.expect;
var eventModels = require('../server/models/eventModels');
var User = require('../server/schemas/userSchema');
var Event = require('../server/schemas/eventsSchema');

var testEvent = {
	name:'Basketball',
	location: [82.894, 47.7749],
	tags:['fun', 'sports'],
}

var testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'password'
}
var userId;
var eventId;

describe('Event Models', function() {
  before(function(done){
    User.remove({}).exec()
    .then(function(){
    	return Event.remove({}).exec()
    })
    .then(function(){
    	var user = new User(testUser)
    	return user.save()
    })
    .then(function(user){
   	  userId = user._id;
   	  testEvent.invitedUsers = [userId];
      done();
    });
  });

  describe('add Event', function() {
    it('should add a new event to the database', function(done) {
      eventModels.addEvent(testEvent)
      .then(function() {
        return Event.findOne({'name': 'Basketball'}).exec()
      })
      .then(function(event) {
      	eventId = event._id;
        expect(event.name).to.equal('Basketball');
        done();
      });
    });
    it('should add the invite to the users event', function(done) {
      User.findOne({'email': 'test@test.com'}).exec()
      .then(function(user){
      	expect(user.invitedTo.length).to.equal(1);
        done();
      })
    });
  });

  describe('save Event', function(){
  	before(function(done) {
      eventModels.saveEvent(eventId, userId)
      .then(function(){
      	done();
      })	
  	})
    it('should save the event to the User', function(done){
      User.findOne({'email': 'test@test.com'}).exec()
      .then(function(user) {
        expect(user.saved.length).to.equal(1);
        done();
      })
    });
    it('it should save the user to the event', function(done){
      Event.findOne({'name': 'Basketball'}).exec()
      .then(function(event) {
        expect(event.savedUsers.length).to.equal(1);
        done();
      })
    });
  });

  describe('Check in', function() {
    it('should check in a user to the event', function(done) {
      eventModels.checkIn(eventId, userId)
      .then(function(){
        return Event.findOne({'name': 'Basketball'}).exec()
      })
      .then(function(event) {
        expect(event.checkedInUsers.length).to.equal(1);
        done();
      });
    });
  });

  describe('remove Event', function() {
  	before(function(done){
      this.timeout(4000);
  		eventModels.removeEvent(eventId)
  		.then(function(){
  			done();
  		})
  	})
    it('should remove the event from the database', function(done) {
      Event.findOne({'email': 'test@test.com'}).exec()
      .then(function(event) {
      	expect(!!event).to.equal(false);
      	done();
      })
      .catch(function(error) {
        done();
      });
    it('should remove the event from the users saved events', function(done) {
      User.findOne({'email': 'test@test.com'}).exec()
      .then(function(user) {
        expect(user.saved.length).to.equal(0);
        done();
      });
    });
    it('should remove the event from the users invited events', function(done) {
      User.findOne({'email': 'test@test.com'}).exec()
      .then(function(user) {
        expect(user.invitedTo.length).to.equal(0);
        done();
      });
    });
    });
  });

  


});