const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);


    router
        .post('/students/marks/saveMarks', function(req, res, next) {
            return controller.saveEditMarks(req, res, next);
        })
        /* GET students page. */
        .get('/students', (req, res) => {
            return controller.getAll(req, res);
        })
        .get('/:id', (req, res) => {
            const id = req.params.id;
            return controller.getStudentById(req, res);
        })
        /* GET student's profile. */
        .get('/students/profile', (req, res) => {
            return controller.getStudentProfile(req, res);
        })
        .get('/students/marks/editMarks', (req, res, next) => {
            return controller.getEditMarksView(req, res, next);
        })
        /* GET student's marks. */
        .get('/students/marks', (req, res) => {
            return controller.getStudentMarks(req, res);
        });

    return router;
};
