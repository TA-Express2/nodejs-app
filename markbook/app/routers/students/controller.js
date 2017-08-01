const md5 = require('md5');

const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.students.getAll()
                .then((students) => {
                    return res.render('students/listAll', {
                        model: students,
                    });
                });
        },
        addStudentForm(req, res) {
            if (req.user && (req.user.role === 'admin' || req.user.role === 'teacher')) {
                return res.render('students/form');
            }
            return res.redirect('/login');
        },
        addStudent(req, res) {
            if (req.user && (req.user.role === 'admin' || req.user.role === 'teacher')) {
                const student = req.body;
                data.students.create(student)
                    .then(async (dbStudent) => {
                        const count = (await data.students.getCollectionCount())
                            .toString();
                        const pad = '0000';
                        const number = 'S' +
                            pad.substring(0, pad.length - count.length) + count;
                        data.students.collection
                        .update({ _id: dbStudent._id }, {
                            $set: {
                                number: number,
                                marks: [],
                            },
                        })
                        .then(data.users.create({
                            email: student.email,
                            hashPassword: md5(student.egn),
                            egn: student.egn,
                            role: 'student',
                        }))
                        .catch(function(err) {
                            throw err;
                        });
                        res.redirect('/students');
                    });
            }
        },
        getStudentById(req, res) {
            return data.students.findByNumber(req.params.id)
                .then((student) => {
                    if (!student) {
                        return res.render('users/noUser', {
                            title: 'Student not found!',
                        });
                    }
                    return res.render('students/student', {
                        model: student,
                    });
                });
        },
        showStudentById(req, res) {
            return data.students.findByNumber(req.params.id)
                .then((student) => {
                    return res.render('students/edit', {
                        model: student,
                    });
                })
                .catch(function(err) {
                    throw err;
                });
        },
        editStudentById(req, res) {
            return data.students.findByNumber(req.params.id)
                .then((student) => {
                    data.students.updateStudent(student, req.body);
                    data.students.collection.update({ _id: student._id }, {
                        $set: {
                            role: 'student',
                            number: req.params.id,
                        },
                    });
                    res.redirect('/students');
                });
        },
        getStudentMarks(req, res) {
            if (req.user) {
                return data.students.getAll()
                    .then((students) => {
                        return res.render('students/marks', {
                            title: 'Marks',
                            model: students,
                        });
                    });
            }
            return res.redirect('/login');
        },
    };
    return controller;
};

module.exports = {
    init,
};
