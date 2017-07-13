const init = (app, data) => {
    const controller = {
        getStudentView(req, res) {
            return res.render('students', {
                title: 'Students',
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
