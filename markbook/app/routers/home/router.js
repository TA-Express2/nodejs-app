const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(app, data);

    /* GET home page. */
    router
        .get('/', (req, res) => {
            return controller.getHomeView(req, res);
        })
        .get('/home', (req, res) => {
            return controller.getHomeView(req, res);
        })
        .get('/about', (req, res) => {
            return controller.getAboutView(req, res);
        });

    return router;
};
