var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var jwtVerifer = require('express-jwt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded({extended:false}));

var secret = "mySecret";

app.post('/login', (req, res) => {
  if(req.body.username == "milos.kosanovic" && req.body.password == "vts2019") {
    let token = jwt.sign({userID: "milos.kosanovic"}, secret);
    res.send(token);
  } else {
    res.sendStatus(400);
  }
});

app.get('/', jwtVerifer({secret:secret}), (req, res) => {
  res.send('Imas pristup sajtu');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if(err.name === 'UnauthorizedError') {
    return res.send('Nemas pristup, saljem te na login formu. ('+err.message+')');
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;