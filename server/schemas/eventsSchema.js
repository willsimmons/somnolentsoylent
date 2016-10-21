var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventSchema = new Schema({
  id: Schema.Types.ObjectId,
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
  if(!this.endTime){
    this.endTime = new Date(this.startTime.getTime());
    this.endTime.setHours(this.endTime.getHours() + 6);
  }
  next();
})

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
