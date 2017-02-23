var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errors = require('errors');
var index = require('./routes/index');
var home = require('./routes/home');
var login = require('./routes/login');
var passport = require('./server/util/passport');
var helper = require('./server/middleware/responseHelper');
var session = require('express-session');
var config = require('config');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var accessLogStream = fs.createWriteStream(__dirname + '/login-poc.log', {flags: 'a'});
 
app.use(logger('combined', {stream: accessLogStream}));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');

app.use(session({
  secret: config.secretKey,
  resave: false,
  saveUninitialized: false
}));

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(login);

app.use('/', index);
app.use('/home', home);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
console.log("NOT FOUND");
	 next(helper.handleError(404, "Not Found"));
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
