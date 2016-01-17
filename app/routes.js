module.exports = function(app) {
  //Routes
  app.get('/', require('./controllers/HomeCtrl.js'));
};
