const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/students', controller.getAll)
        .post('/students', controller.addStudent)
        .get('/students/form', controller.addStudentForm)
        .get('/students/:id', controller.getStudentById)
        .get('/students/:id/edit', controller.editStudentById)
        .get('/students/marks', controller.getStudentMarks)
        .post('/students/marks/saveMarks', controller.saveEditMarks)
        .get('/students/marks/editMarks', controller.getEditMarksView)
        .get('/students/profile', controller.getStudentProfile);

    return router;
};
