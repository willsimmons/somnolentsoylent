var chai = require('chai');
var expect = chai.expect;
var Event = require('../server/schemas/eventsSchema.js');

describe('Event Schema', function() {
  it('schema should have properties id, name, location, startTime, endTime, tags, invitedUsers, checkedInUsers, visibility and savedUsers', function() {
    expect(Event.schema.obj).to.have.all.keys(['id', 'name', 'location', 'startTime', 'endTime', 'tags', 'invitedUsers', 'checkedInUsers', 'visibility', 'savedUsers']);
  });
});
