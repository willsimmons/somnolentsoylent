var bodyParser = require('body-parser');


module.exports = function (app, express) {
  // Parse Post Bodys
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  // Host Static Files
  app.use(express.static(__dirname + '/../../client'));
};