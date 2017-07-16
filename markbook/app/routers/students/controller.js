const init = (app, data) => {
    const controller = {
        getStudentView(req, res) {
            const db = req.db;
            const collection = db.get('students');
            collection.find({}, {}, function(e, list) {
                res.render('students', {
                    userlist: list,
                    title: 'Students list',
                });
            });
        },
        getStudentById(req, res) {
            if (!req.id) {
                return res.render('noUser', {
                    title: 'No such a student',
                });
            }
            return res.render('student', {
                title: `Student ${req.id}`,
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