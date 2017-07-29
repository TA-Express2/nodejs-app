const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/:grade', controller.getMarkbookByGrade)
        .post('/saveMarks', controller.saveMarks);
    return router;
};
