const express = require('express');

module.exports = (app) => {
    const router = new express.Router();
    const controller = require('./controller').init(app);

    /* GET home page. */
    router.get('/', (req, res) => {
        return controller.getHomeView(req, res);
    });

    return router;
};
