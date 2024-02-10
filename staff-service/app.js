var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutusRouter = require('./routes/aboutus');
var db = require('./db')
var app = express();
const eurekaHelper = require('./eureka-helper');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static(path.join(__dirname, 'static')));
app.use(cors())
app.use('/static', express.static('public'));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/aboutus', aboutusRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// connecting db and print db values
// Connect to MySQL on start

db.connect(db.MODE_PRODUCTION, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  }else{
    console.log('Connect to MySQL.')
  }
})
const PORT = process.env.PORT || 9094;
app.listen(PORT, function() {
  console.log('Listening on port {}',PORT)
})
eurekaHelper.registerWithEureka('STAFF-SERVICE', PORT);
module.exports = app;
