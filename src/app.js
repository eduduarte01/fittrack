import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';
import expressLayouts from 'express-ejs-layouts';
import createError from 'http-errors';

// Importar rotas
import indexRouter from './routes/index.js';
import userRouter from './modules/user/userRoutes.js';
import workoutRoutes from './modules/workout/workoutRoutes.js';

const app = express();

// view engine setup
app.set("views", path.join(process.cwd(), "src/views"));
app.set("layout", path.join(process.cwd(), "src/views/layouts/main"));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "src/public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "segredo",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.user = req.session.user || null;
  res.locals.title = 'FitTrack';
  next();
});

// Rotas
app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/", workoutRoutes);

// health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timeStamp: new Date().toISOString(),
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
