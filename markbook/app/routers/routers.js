module.exports = (app, data) => {
    const home = require('./home')(app, data);
    const login = require('./auth')(app, data);
    const students = require('./students')(app, data);

    app.get('*', function(req, res, next) {
        // just use boolean for loggedIn
        res.locals.loggedIn = (req.user) ? true : false;

        next();
    });

    app.use('/', home);
    app.use('/', login);
    app.use('/', students);

};
