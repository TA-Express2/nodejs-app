const { MongoClient, ObjectID } = require('mongodb');

const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.students.getAll()
                .then((students) => {
                    return res.render('students/listAll', {
                        model: students
                    });
                });
        },
        addStudentForm(req, res) {
            return res.render('students/form');
        },
        addStudent(req, res) {
            const student = req.body;
            data.students.create(student)
                .then(async (dbStudent) => {
                    let count = (await data.students.getCollectionCount()).toString();
                    let pad = '0000';
                    let number = 'S' + pad.substring(0, pad.length - count.length) + count;
                    data.students.collection.update({_id: dbStudent._id}, {
                        $set: {
                            role: 'student',
                            number: number
                        }
                    });
                    res.redirect('/students/listAll');
                })
        },
        getStudentById(req, res) {
            return data.students.findByNumber(req.params.id)
                .then((student) => {
                    if (!student) {
                        return res.render('noUser', {
                            title: 'No such a student',
                        });
                    }
                    return res.render('students/student', {
                        model: student
                    });
                });
        },
        editStudentById(req, res) {
            console.log('+++++++++++++++++', req.params.id)
            return data.students.findByNumber(req.params.id)
                .then((student) => {
                    console.log('student', student)
                    return res.render('students/edit', {
                        model: student
                    });
                });
        },
        getStudentMarks(req, res) {
            if (req.user) {
                return data.students.getAll()
                    .then((students) => {
                        return res.render('marks', {
                            title: 'Marks',
                            model: students
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
                    .then(async (db) => {

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
                                };
                                return res.redirect('/students/marks');
                            },
                        );
                    });
            };
        },
        getStudentProfile(req, res) {
            if (req.user) {
                return res.render('profile', {
                    title: 'Your profile:',
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
