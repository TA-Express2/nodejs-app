const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/changePassword', controller.viewChangeUserPassword)
        .post('/changePassword', controller.changeUserPassword)
        .get('/profile', controller.getUserProfile);

    return router;
};
