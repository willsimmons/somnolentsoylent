var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: String,
  location: {
    type: [Number],
    index: '2dsphere',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  tags: [String],
  invitedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  checkedInUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  visibility: {
    type: String,
    default: 'Public'
  },
  savedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

eventSchema.pre('save', function (next) {
  this.endTime = this.endTime || (this.startTime.getDate() + .25);
  next();
})

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
