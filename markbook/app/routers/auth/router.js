const express = require('express');
const passport = require('passport');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(app, data);

    /* GET register page. */
    router
        .get('/login', (req, res) => {
            return controller.getLoginView(req, res);
        })
        .post('/login',
            /*(req, res) => {
                console.log('Post request sent')
            }*/
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true,
            })
        )
        .get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
    return router;
};