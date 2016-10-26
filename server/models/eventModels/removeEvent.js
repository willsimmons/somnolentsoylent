// removeEvent.js
var Event = require('../../schemas/eventsSchema');

module.exports = (eventId) => {
	return Event.remove({'_id': eventId});
}