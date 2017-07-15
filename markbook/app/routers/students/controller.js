const init = (app, data) => {
    const controller = {
        getStudentView(req, res) {
            return res.render('students', {
                title: 'Students',
            });
        },
        getStudentProfile(req, res) {
            if (req.user) {
                return res.render('profile', {
                    title: 'Profile',
                });
            } else {
                return res.redirect('/login');
            }
        },
        getStudentMarks(req, res) {
            if (req.user) {
                return res.render('marks', {
                    title: 'Marks',
                });
            } else {
                return res.redirect('/login');
            }
        },
    };

    return controller;
};

module.exports = {
    init,
};