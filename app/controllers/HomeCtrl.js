var HomeCtrl = function (req, res) {
  res.render('index.html', { title: 'Hey', message: 'Hello there!'});
};

module.exports = HomeCtrl;
