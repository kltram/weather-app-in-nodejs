'use strict';
const express = require('express'),
 path = require('path'),
 favicon = require('serve-favicon'),
 morgan = require('morgan'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 jwt = require('jsonwebtoken'),
 cors = require('cors'),
 index = require('./routes/index'),
 Config = require('./public/config/config.js'),
 app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//set secret
app.set('Secret', Config.secret);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
