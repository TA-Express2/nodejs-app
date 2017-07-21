module.exports = (app, data) => {
    const home = require('./home')(app, data);
    const about = require('./home')(app, data);
    const login = require('./auth')(app, data);
    const students = require('./students')(app, data);
    const profile = require('./students')(app, data);
    const marks = require('./students')(app, data);
    const editMarks = require('./students')(app, data);
    const saveMarks = require('./students')(app, data);

    app.get('*', function(req, res, next) {
        // check if there is user logged in
        res.locals.loggedIn = (req.user) ? true : false;
        next();
    });

    app.use('/', home);
    app.use('/', about);
    app.use('/', login);
    app.use('/', students);
    app.use('/:id', students);
    app.use('/', profile);
    app.use('/', marks);
    app.use('/', editMarks);
    app.use('/', saveMarks);
};
