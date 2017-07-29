module.exports = (app, data) => {
    const home = require('./home')(app, data);
    const login = require('./auth')(app, data);
    const changePassword = require('./users')(app, data);
    const profile = require('./users')(app, data);
<<<<<<< HEAD
    const students = require('./students')(app, data);
    const marks = require('./students')(app, data);
    const editMarks = require('./students')(app, data);
    const saveMarks = require('./students')(app, data);
    const teachers = require('./teachers')(app, data);
=======
    const markbook = require('./markbook')(app, data);
>>>>>>> c0b4d52026813bbbfd724c959cab71de8f4922a6

    app.get('*', function(req, res, next) {
        // check if there is user logged in
        res.locals.loggedIn = (req.user) ? true : false;
        next();
    });

    app.use('/', home);
    app.use('/', login);
    app.use('/', changePassword);
    app.use('/', students);
    app.use('/:id', students);
    app.use('/edit/:id', students);
    app.use('/', profile);
<<<<<<< HEAD
    app.use('/', marks);
    app.use('/', editMarks);
    app.use('/', saveMarks);
    app.use('/', teachers);
=======
    app.use('/:grade', markbook);
    app.use('/saveMarks', markbook);
>>>>>>> c0b4d52026813bbbfd724c959cab71de8f4922a6
};
