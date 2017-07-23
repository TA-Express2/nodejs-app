const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/students', controller.getAll)
        .get('/students/form', controller.addStudentForm)
        .post('/students', controller.addStudent)
        .get('/students/:id', controller.getStudentById)
        /* GET student's marks. */
        .get('/students/marks', (req, res) => {
            return controller.getStudentMarks(req, res);
        })
        .post('/students/marks/saveMarks', function(req, res, next) {
            return controller.saveEditMarks(req, res, next);
        })
        .get('/students/marks/editMarks', (req, res, next) => {
            return controller.getEditMarksView(req, res, next);
        });

    return router;
};
