const init = (data) => {
    console.log('****************************', data);
    const controller = {
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
