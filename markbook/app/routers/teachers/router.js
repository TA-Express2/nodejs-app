const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/teachers', controller.getAllTeachers)
        .post('/teachers', controller.addTeacher)
        .get('/teachers/form', controller.addTeacherForm)
        .get('/teachers/:id', controller.getTeacherById)
        .get('/teachers/edit/:id', controller.showTeacherById)
        .post('/teachers/edit/:id', controller.editTeacherById);

    return router;
};
