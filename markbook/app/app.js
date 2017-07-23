/* globals __dirname */

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const mongo = require('mongodb');
const monk = require('monk');
const db = monk('localhost:27017/markbook');
const app = express();
const favicon = require('serve-favicon');
const init = async() => {
    const config = require('../config');
    const db = await require('../db').init(config.connectionString);
    const data = await require('../data').init(db);
    const usersData = await require('../data/users.data');
    require('../config/config')
    await require('../config/auth.config')(app, usersData);

    // Login with user from mongo not working with this one
    // const init = (data) => {
    //     const app = express();

    app.use((req, res, next) => {
        // console.log('----Current user-----');
        // console.log(`req.user = ${req.user}`);
        next();
    });

    // logged in user accessible via currentUser
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }
        next();
    });

    // confiq
    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');
    // uncomment after placing your favicon in /public
    app.use(favicon(__dirname + '/../public/assets/favicon.png'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use('/public', express.static(path.join(__dirname, '../public')));
    app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

    // Make our db accessible to our router
    app.use(function(req, res, next) {
        req.db = db;
        next();
    });

    require('./routers/routers')(app, data);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err = new Error('Not Found');
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

    return Promise.resolve(app);
};

init();
module.exports = {
    init,
};
