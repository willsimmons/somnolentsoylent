var chai = require('chai');
var expect = chai.expect;
var Event = require('../server/schemas/eventsSchema.js');

describe('Event Schema', function() {
  it('model should exist', function() {
    console.log(Event);
    expect(true).to.equal(true);
  });
});
