var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var things = require('./routes/things');
var makers = require('./routes/makers');
var files = require('./routes/files');
// var orgclass = require('./routes/orgclass');
// var team = require('./routes/team');
// var student = require('./routes/student');
// var assessment = require('./routes/assessment');
// var api = require('./routes/api');

var app = express();

const pool = require('./lib/db');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//database setup
//global.db_constr = "mssql://sa:1234@172.16.0.10/icdean";

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
},
(username, password, done) => {
  console.log("Login process:", username);
  return pool.query("SELECT id,login,name " +
      "FROM makers " +
      "WHERE login=$1 AND password=$2", [username, password])
    .then((result)=> {
      console.log(result.rows[0]);
      return done(null, result.rows[0]);
    })
    .catch((err) => {
      console.log("/login: " + err);
      return done(null, false, {message:'Wrong user name or password'});
    });
}));


passport.serializeUser((user, done)=>{
    console.log("serialize ", user);
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=>{
    console.log("deserualize ", id);
    pool.query("SELECT id, login, name FROM makers " +
            "WHERE id = $1", [id])
    .then((result)=>{
      console.log("deserializeUser ", result.rows[0]);
      done(null, result.rows[0]);
    })
    .catch((err)=>{
      done(new Error(`User with the id ${id} does not exist`));
    })
  });

app.use('/', routes);
app.use('/makers', makers);
app.use('/things', things);
// app.use('/files', files);
// app.use('/team', team);
// app.use('/orgclass', orgclass);
// app.use('/assessment', assessment);
// app.use('/api', api);

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
