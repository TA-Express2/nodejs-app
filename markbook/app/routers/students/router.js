const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);


    router
    /* SAVE marks after edition. */
        .post('/students/marks/saveMarks', function(req, res, next) {
            return controller.saveEditMarks(req, res, next);
        })
        /* GET students page. */
        .get('/students', (req, res) => {
            return controller.getAll(req, res);
        })
        /* GET student's profile. */
        .get('/students/profile', (req, res) => {
            return controller.getStudentProfile(req, res);
        })
        /* GET student's marks. */
        .get('/students/marks', (req, res) => {
            return controller.getStudentMarks(req, res);
        })
        /* GET edit marks. */
        .get('/students/marks/editMarks', (req, res, next) => {
            return controller.getEditMarksView(req, res, next);
        })
        /* GET students by ID. */
        .get('/students/:id', (req, res) => {
            return controller.getStudentById(req, res);
        });

    return router;
};