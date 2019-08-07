const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const resourcesRouter = require('./routes/resources');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/resources', resourcesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.status(err.status || 500);
    console.log(err);
    res.json({error: err.message});
});

module.exports = app;
