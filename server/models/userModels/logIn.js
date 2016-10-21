// logIn.js

var User = require('../../schemas/userSchema')

//Add a new user to the database
module.exports = (email, password) => {
	User.findOne({})
};