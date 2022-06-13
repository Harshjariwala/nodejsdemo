const path = require('path');
const logger = require('morgan');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const { sessionSecret } = require('./config');
const routes = require("./routes");
const error = require("./middlewares/error");
const database = require("./middlewares/database");
const { sendJson } = require("./middlewares/generateResponse");

const app = express();

database.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: sessionSecret, resave: true, saveUninitialized: true }));

app.response.sendJson = sendJson;

app.use("/", routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
