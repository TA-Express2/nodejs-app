const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(app, data);

    /* GET students page. */
    router
      .get('/students', (req, res) => {
      return controller.getStudentView(req, res);
    })
      .get('/profile', (req, res) => {
      return controller.getStudentProfile(req, res);
    })
      .get('/marks', (req, res) => {
      return controller.getStudentMarks(req, res);
    });

    return router;
};
