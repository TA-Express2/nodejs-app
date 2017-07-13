module.exports = (app, data) => {
    const home = require('./home')(app);
    const login = require('./auth')(data);
    const register = require('./students')(data);
    const students = require('./students')(app, data);

    app.use('/', home);
    app.use('/login', login);
    app.use('/register', register);
    app.use('/students', students);
};
