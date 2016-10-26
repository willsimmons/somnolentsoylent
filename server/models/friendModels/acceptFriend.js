// acceptFriend.js
var User = require('../../schemas/userSchema')

module.exports = (userId, friendId) => {
	return User.findOneAndUpdate({
		'_id': userId
	}, {
		$pull: {
			requests: friendId
		},
		$push: {
			friends: friendId
		}
	}).then( success => {
		return User.findOneAndUpdate({
			'_id': friendId
		}, {
			$push: {
				friends: userId
			}
		})
	})
}