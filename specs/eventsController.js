// eventsController.js
// friendController.js

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var request = require('supertest');
var eventsController = require('../server/controllers/eventsController');
var eventModels = require('../server/models/eventModels');
var User = require('../server/schemas/userSchema');
var Event = require('../server/schemas/eventsSchema');
var app = require('../server/server');

//Event Controller will break if event models are broken

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

describe('Events Controller', function() {
  console.log('WARNING: Events Controller will break if eventModels is broken');
  describe('add Event', function() {
    before(function(done){
      sinon.spy(eventModels, 'addEvent');
      Event.remove({}).exec()
      .then(function(){
        return User.remove({}).exec();
      })
      .then(function(){
        done();
      })
    })
    after(function(){
      eventModels.addEvent.restore();
    })
    it('should send a 201 with a success', function(done) {
      request(app)
          .post('/api/events')
          .send(testEvent)
          .expect(201)
          .end(done);
    });
    it('should call eventModels.addEvent', function() {
      expect(eventModels.addEvent.calledOnce).to.equal(true);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
          .post('/api/events')
          .send({'pizza': 'SQUERP SQUERRPP'})
          .expect(400)
          .end(done);
    });
  });

  describe('save Event', function() {
    before(function(done){
      sinon.spy(eventModels, 'saveEvent');
      var user = new User(testUser)
      user.save()
      .then(function(user){
        userId = user._id;
        return Event.findOne({name: 'Basketball'}).exec();
      })
      .then(function(event) {
        eventId = event._id;
        done();
      })
    })
    after(function(){
      eventModels.saveEvent.restore();
    })
    it('should send a 201 with a success', function(done) {
      request(app)
          .post('/api/events/saveEvent')
          .send({eventId: eventId, userId: userId})
          .expect(201)
          .end(done);
    });
    it('should call eventModels.saveEvent', function() {
      expect(eventModels.saveEvent.calledOnce).to.equal(true);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
          .post('/api/events/saveEvent')
          .send({'pizza': 'SQUERP SQUERRPP'})
          .expect(400)
          .end(done);
    });
  });

  describe('check In', function() {
    before(function(done){
      sinon.spy(eventModels, 'checkIn');
      done();
    })
    after(function(){
      eventModels.checkIn.restore();
    })
    it('should send a 201 with a success', function(done) {
      request(app)
          .post('/api/events/checkIn')
          .send({eventId: eventId, userId: userId})
          .expect(201)
          .end(done);
    });
    it('should call eventModels.checkIn', function() {
      expect(eventModels.checkIn.calledOnce).to.equal(true);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
          .post('/api/events/checkIn')
          .send({'pizza': 'SQUERP SQUERRPP'})
          .expect(400)
          .end(done);
    });
  });

  xdescribe('end Event', function() {
    before(function(done){
      sinon.spy(eventModels, 'removeEvent');
      done();
    })
    after(function(){
      eventModels.removeEvent.restore();
    })
    it('should send a 200 with a success', function(done) {
      request(app)
          .post('/api/events/endEvent')
          .send({eventId: eventId})
          .expect(200)
          .end(done);
    });
    it('should call eventModels.removeEvent', function() {
      expect(eventModels.removeEvent.calledOnce).to.equal(true);
    });
    it('should send a 400 with bad input', function(done) {
      request(app)
          .post('/api/events/endEvent')
          .send({'pizza': 'SQUERP SQUERRPP'})
          .expect(400)
          .end(done);
    });
  });
  
});