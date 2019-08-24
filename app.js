const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwtVerifer = require('express-jwt');
const mongoose= require('mongoose');
const constants = require('./constants');
const session = require('express-session');

mongoose.connect(constants.dbPath, {useNewUrlParser:true});

if(constants.initalizeDB) {
  require('./sources/init');
}

const loginRouter = require('./routes/login');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');
const indexRouter = require('./routes/index');
const deleteRouter = require('./routes/delete');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name:'sid',
  resave: false,
  saveUninitialized: false,
  secret:'canYouKeepMySecretPlease?',
  cookie: {
    sameSite:true,
    secure: false//todo true
  }
}));

function requireAuthorization(req, res, next) {
  if(req.session.userType != 'worker') {
    req.session.errorMessage = 'Greška! Nemate pristup traženom dokumentu!'
    res.redirect('/login');
  } else {
    next();
  }
}

function requireNOTauthorized(req, res, next) {
  if(req.session.userType == 'worker') {
    res.redirect('/');
  } else {
    next();
  }
}

app.use('/login', requireNOTauthorized, loginRouter);
app.use('/menu', jwtVerifer({secret:constants.jwt_secret}), menuRouter);
app.use('/order', jwtVerifer({secret:constants.jwt_secret}), orderRouter);
app.use('/', requireAuthorization, indexRouter);
app.use('/delete', requireAuthorization, deleteRouter);
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if(err) {
      return res.redirect('/');
    }
    res.clearCookie('sid');
    res.redirect('/login');
  })
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  if(err.name === 'UnauthorizedError') {
    return res.send('Greska pri autorizaciji ('+err.message+')');
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;