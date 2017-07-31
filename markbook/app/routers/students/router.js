const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/students', controller.getAll)
        .post('/students', controller.addStudent)
        .get('/students/form', controller.addStudentForm)
        .get('/students/:id', controller.getStudentById)
        .get('/students/edit/:id', controller.showStudentById)
        .post('/students/edit/:id', controller.editStudentById)
        .get('/students/marks', controller.getStudentMarks);

    return router;
};
