var express = require('express');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named "sembly"
mongoose.connect('mongodb://localhost/sembly');	

// configure our server with all the middleware and routing
require('./middleware.js')(app, express);
require('./routes.js')(app, express);

// start listening to requests on port 3000
app.listen(3000);

// export our app
module.exports = app;