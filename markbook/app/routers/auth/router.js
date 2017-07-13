const express = require('express');

module.exports = (app, data) => {
const router = new express.Router();
const controller = require('./controller').init(app, data);

    /* GET register page. */
    router.get('/login', (req, res) => {
      return controller.getRegView(req, res);
    });

    return router;
};
