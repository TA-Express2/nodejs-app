module.exports = (app, data) => {
    const home = require('./home')(app, data);
    const login = require('./auth')(app, data);
    const students = require('./students')(app, data);

    app.use('/', home);
    app.use('/', login);
    app.use('/', students);
};
