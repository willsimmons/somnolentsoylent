// testData.js
var mongoose = require('mongoose');
var User = require('./server/schemas/userSchema');
var Event = require('./server/schemas/userSchema');

mongoose.connect('mongodb://localhost/sembly');		

//FILL IN DATA TO BE CREATED
var users = [
	{},
	{}
];

var events = [
	{},
	{}
];

mongoose.connection.on('connected', () => {
	//Populate Database
  });
});