var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser');

//require routes file
require('./app/routes.js')(app);

//jade config
app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//FOR DEV
app.use(express.static('public'));
// app.use(express.static('/public'));

//FOR PRODUCTION
// app.use(express.static(__dirname + '/'));

//require routes file
require('./app/routes')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard double cat',
    resave: false,
    saveUninitialized: false
}));
// app.use(express.static(process.env.OPENSHIFT_REPO_DIR + '/public' ));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//server and port
// var port = process.env.PORT || 3000;
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});
