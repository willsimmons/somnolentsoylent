var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  location: {
    type: [Number],
    index: '2dsphere'
  },
  startTime: Date,
  endTime: Date,
  tags: [String],
  invitedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  checkedInUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  visibility: String,
  savedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
