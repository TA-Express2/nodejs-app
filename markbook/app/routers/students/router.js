const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(app, data);

    /* GET students page. */
    router
        .get('/students', (req, res) => {
            return controller.getStudentView(req, res);
        })
        .get('/:id', (req, res) => {
            const id = req.params.id;
            return controller.getStudentById(req, res);
        })
        /* GET student's profile. */
        .get('/students/profile', (req, res) => {
            return controller.getStudentProfile(req, res);
        })
        /* GET student's marks. */
        .get('/students/marks', (req, res) => {
            return controller.getStudentMarks(req, res);
        });

    return router;
};