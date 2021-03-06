module.exports = (app, data) => {
    const home = require('./home')(app, data);
    const login = require('./auth')(app, data);
    const changePassword = require('./users')(app, data);
    const profile = require('./users')(app, data);
    const students = require('./students')(app, data);
    const teachers = require('./teachers')(app, data);
    const subjects = require('./subjects')(app, data);
    const markbook = require('./markbook')(app, data);

    app.get('*', function(req, res, next) {
        // check if there is user logged in
        res.locals.loggedIn = (req.user) ? true : false;
        next();
    });

    app.use('/', home);
    app.use('/', login);
    app.use('/', profile);
    app.use('/', changePassword);
    app.use('/', students);
    app.use('/:id', students);
    app.use('/edit/:id', students);
    app.use('/', teachers);
    app.use('/:id', teachers);
    app.use('/edit/:id', teachers);
    app.use('/', subjects);
    app.use('/editSubject', subjects);
    app.use('/', markbook);
    app.use('/:grade', markbook);
};
