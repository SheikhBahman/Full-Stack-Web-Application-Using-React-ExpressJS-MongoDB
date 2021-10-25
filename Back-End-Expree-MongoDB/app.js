var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var certificateRouter = require('./routes/certificateRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var config = require('./config');
var passport = require('passport');
var commentRouter = require('./routes/commentRouter');

const uploadRouter = require('./routes/uploadRouter');
const favoriteRouter = require('./routes/favoriteRouter');
const logRouter = require('./routes/logRouter');
const Loggs = require('./models/loggs');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
    useMongoClient: true
});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    } else {
        res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
    }

});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.all('*', (req, res, next) => {
    Loggs.create({ "log": req.method + " " + req.hostname + " " + req.url });
    return next();
});

app.use('/', index);
app.use('/users', users);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/certificates', certificateRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites', favoriteRouter);
app.use('/comments', commentRouter);
app.use('/loggs', logRouter);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;