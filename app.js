var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv").config();
const cors = require('cors');

var indexRouter = require('./routes/index');
var carRouter = require('./routes/car.api.js');
const { default: mongoose } = require('mongoose');
const { sendResponse } = require('./utils/utils.js');

var app = express();

const mongodbURL = process.env.MONGODB_URI

mongoose
    .connect(mongodbURL)
    .then(() => console.log(`Connected to ${mongodbURL}`))
    .catch((err) => console.log(err))

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cars', carRouter)

app.use((err, req, res, next) => {
    console.log("ERROR", err);
    return sendResponse(
        res,
        err.statusCode ? err.statusCode : 500,
        false,
        null,
        { message: err.message },
        err.isOperational ? err.errorType : "Internal Server Error"
    );
});

module.exports = app;
