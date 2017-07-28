const { MongoClient, ObjectID } = require('mongodb');

const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.students.getAll()
                .then((students) => {
                    return res.render('students/listAll', {
                        currentUser: req.user,
                        model: students,
                    });
                });
        },
        addStudentForm(req, res) {
            return res.render('students/form', {
                currentUser: req.user,
            });
        },
        addStudent(req, res) {
            const student = req.body;
            data.students.create(student)
                .then(async(dbStudent) => {
                    const count = (await data.students.getCollectionCount()).toString();
                    const pad = '0000';
                    const number = 'S' + pad.substring(0, pad.length - count.length) + count;
                    data.students.collection.update({ _id: dbStudent._id }, {
                        $set: {
                            number: number,
                            marks: [],
                        },
                    })
                    .then(data.users.create({
                        email: student.email,
                        hashPassword: student.egn,
                        egn: student.egn,
                        role: 'student',
                    }))
                    .catch(function(err) {
                        throw err;
                    });
                    res.redirect('/students');
                })
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
                        currentUser: req.user,
                        model: student,
                    });
                });
        },
        showStudentById(req, res) {
            return data.students.findByNumber(req.params.id)
                .then((student) => {
                    return res.render('students/edit', {
                        currentUser: req.user,
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
                            number: req.params.id
                        }
                    });
                    res.redirect('/students');
                });
        },
        getStudentMarks(req, res) {
            if (req.user) {
                return data.students.getAll()
                    .then((students) => {
                        return res.render('students/marks', {
                            currentUser: req.user,
                            title: 'Marks',
                            model: students,
                        });
                    });
            } else {
                return res.redirect('/login');
            }
        },
        getEditMarksView(req, res, next) {
            const id = JSON.stringify(req.query.id);
            if (req.user.role === "admin" || req.user.role === "teacher") {
                return data.students.getAll()
                    .then((students) => {
                        let data;
                        students.forEach((student) => {
                            if (JSON.stringify(student._id) === id) {
                                return data = student;
                            }
                            return data;
                        });
                        res.send(data);
                    })
                    .catch(function(err) {
                        throw err;
                    });
            }
        },
        saveEditMarks(req, res, next) {
            if (req.user.role === "admin" || req.user.role === "teacher") {
                return MongoClient.connect('mongodb://localhost/markbook')
                    .then(async(db) => {

                        const collection = db.collection('students');
                        const userId = req.body.id;
                        const subject = req.body.subject;
                        const marks = req.body.marks.split(',');

                        collection.update({
                                "_id": ObjectID(userId),
                                "marks.name": subject,
                            }, {
                                $set: {
                                    ['marks.$.' + subject]: marks,
                                },
                            },
                            function(err, success) {
                                if (err) {
                                    throw err;
                                }
                                return res.redirect('/students/marks');
                            },
                        );
                    });
            }
        },
    };
    return controller;
};

module.exports = {
    init,
};
