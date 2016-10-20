module.exports = function (app, express) {
  //Handle Auth and login/signup
  app.post('/api/users/login', userController.login);
  app.post('/api/users/signup', userController.signup);
  app.get('/api/users/signedin', userController.checkAuth);
  app.put('/api/users/update', userController.updateUser);

  //Handle Friend actions
  app.get('/api/users/getFriends', friendController.getFriends);
  app.post('/api/users/friendRequest', friendController.friendRequest);
  app.post'/api/users/acceptRequest', friendController.acceptRequest);

  //Handle events requests
  app.post('/api/events/', eventsController.getEvents);
  app.post('/api/events/', eventsController.addEvent);
  app.post('/api/events/saveEvent', eventsController.saveEvent);
  app.post('/api/events/checkIn', eventsController.checkIn);
  app.post('/api/events/endEvent', eventsController.endEvent);
};