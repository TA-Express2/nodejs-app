const express = require('express');
const passport = require('passport');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/login', controller.getLoginView)
        .post('/login',
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: true,
            })
        )
        .get('/logout', (req, res) => {
                req.logout();
                req.session.destroy((err) => {
                    res.redirect('/');
                });

                const cookie = req.cookies;
                for (const prop in cookie) {
                    if (!cookie.hasOwnProperty(prop)) {
                        continue;
                    }
                    res.cookie(prop, '', { expires: new Date(0) });
                }
            }

        );
    return router;
};
