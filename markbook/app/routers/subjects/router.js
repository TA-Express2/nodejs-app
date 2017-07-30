const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/subjects', controller.getAllSubjects)
        .post('/subjects', controller.addSubject)
        .get('/subjects/form', controller.addSubjectForm)
        .post('/subjects/form', controller.editSubject);

    return router;
};
