// logIn.js

var User = require('../../schemas/userSchema')

var thisUser;

//Add a new user to the database
module.exports = (email, password) => {
	User.findOne({'email': email})
	.then(user => {
		// if (!user) {
		// 	return 'User does not exist';
		// }
		thisUser = user;
		return user.comparePasswords(password);
	})
	.then(match => {
		console.log(match)
		return new Promise( (resolve, reject) => {
			if (match) {
				resolve(thisUser);
			} else {
				resolve('Incorrect Password')
			}
		})
	})
};