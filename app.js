var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require("express-ejs-layouts");

var indexRouter = require('./routes/index');
var userRouter = require('./modules/user/userRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, "views"));
app.set("layout", path.join(__dirname, "views/layouts/main"));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use((req, res, next) => {
   console.log(req.method, req.url);
   next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret : process.env.SESSION_SECRET || 'segredo',
  resave : false,
  saveUninitialized : false,
  cookie : {maxAge : 1000 * 60 * 60 * 24}
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.user = req.session.user || null;
  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', userRouter);

// health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status:'OK',
    message : 'Server is running',
    timeStamp: new Date().toISOString()
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const sequelize = require('./config/database.js');

const User = require('./modules/user/userModel');
const Category = require('./modules/categoria/categoryModel');
const Workout = require('./modules/workout/workoutModel');
const Comment = require('./modules/comentarios/commentsModel');
const UserWorkout = require('./modules/userWorkout/userWorkoutModel');
const { timeStamp } = require('console');

sequelize.sync()
.then(()=>console.log('Banco de dados sincronizado!'))
.catch(err => console.error('Erro ao sincronizar banco :', err));

module.exports = app;