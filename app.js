var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var load = require('express-load');
var flash = require('express-flash');
var session = require("express-session");

//var routes = require('./routes');
//var users = require('./routes/users');


var app = express();


//conectando com o banco
mongoose.connect('mongodb://nodejspi:joaodudu:493010Tlb@ds061701.mongolab.com:61701/nodejspi',function(err)
  {
    if(err)
    {
      console.log('Erro: '+err+'ao conectar no mongo!');
    }
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(cookieSession());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(cookieSession({key: "joaodudu",secret: process.env["SESSION_SECRET"],cookie: {maxAge: 6000}, {signed: true}}));

//app.use(cookieParser({secret:'joaodudu'}));
app.use(session({secret: 'joaodudu'}));
//app.use(session({key: "joaodudu",secret: process.env["SESSION_SECRET"], cookie: { maxAge: 60000 }}));
app.use(flash());

//app.use('/home', routes.index);
//app.use('/users', users);

/*
 *  Autoload Configuration.
 */

load('config').into(app);

for (var environment in app.config) {
  if (environment == app.get('env')) {
    for (var key in app.config[environment]) {
      app.set(key, app.config[environment][key]);
    }
  }
}

/**
 *  Autoload models, controllers and routes into application instance.
 */

load('models').then('controllers').then('routes').into(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
