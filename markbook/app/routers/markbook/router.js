const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/grades', controller.getAllGrades)
        .get('/:grade', controller.getMarkbookByGrade)
        .post('/:grade', controller.saveMarks);
    return router;
};
