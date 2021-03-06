/* globals __dirname */

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

const configApp = (app) => {
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../../views'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const libsPath = path.join(__dirname, '../../node_modules/');
    app.use('/node_modules', express.static(libsPath));

    const staticsPath = path.join(__dirname, '../../public');
    app.use('/public', express.static(staticsPath));

    app.use(cookieParser());
};

module.exports = { configApp };
