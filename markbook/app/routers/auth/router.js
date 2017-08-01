const express = require('express');
const passport = require('passport');
const md5 = require('md5');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router
        .get('/login', controller.getLoginView)
        .post('/login',
            passport.authenticate('local', {
                failureRedirect: '/login',
                failureFlash: true,
            }), (req, res) => {
                if (req.user.egn && (md5(req.user.egn) === req.user.hashPassword)) {
                    return res.redirect('/changePassword');
                }
                return res.redirect('/');
            }
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
