const init = (data) => {
    const controller = {
        getStudentView(req, res) {
            const db = req.db;
            const collection = db.get('users');
            collection.find({}, {}, function(e, list) {
                res.render('students', {
                    userlist: list,
                    title: 'Students list',
                });
            });
        },
        getAllStudents(req, res) {
            return data.students.getAllStudents()
                .then((students) => {
                    return res.render('students', {
                        // model: students,
                        title: 'Students',
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
                    title: 'Your profile:',
                });
            } else {
                return res.redirect('/login');
            }
        },
        getStudentMarks(req, res) {
            if (req.user) {
                const db = req.db;
                const collection = db.get('users');
                collection.find({}, {}, function(e, list) {
                    res.render('marks', {
                        userlist: list,
                        title: 'Marks',
                    });
                });
                //eturn res.render('marks', {
                ///  title: 'Marks',
                //});
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
