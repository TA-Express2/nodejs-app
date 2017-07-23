const { MongoClient, ObjectID } = require('mongodb');

const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.students.getAll()
                .then((students) => {
                    return res.render('students', {
                        title: 'Students',
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
                    res.redirect('/students');
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
                    return res.render('student', {
                        model: student
                    });
                });
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
                // return res.render('marks', {
                //  title: 'Marks',
                // });
            } else {
                return res.redirect('/login');
            }
        },
        getEditMarksView(req, res, next) {
            const id = parseInt(req.query.id);
            if (req.user.role === "admin" || req.user.role === "teacher") {
                return MongoClient.connect('mongodb://localhost/app')
                    .then(async(db) => {
                        const collection = db.collection('users');
                        const usersList = await collection.find({ id: id }).toArray(function(err, docs) {

                            if (err) throw err;

                            res.send(docs);
                            db.close();
                        });
                    })
            } else {
                return res.redirect('/students/marks');
            }
        },
        saveEditMarks(req, res, next) {
            if (req.user.role === "admin" || req.user.role === "teacher") {
                return MongoClient.connect('mongodb://localhost/app')
                    .then(async(db) => {
                        const collection = db.collection('users');
                        const userId = parseInt(req.body.id, 10);
                        const subject = req.body.subject.toLowerCase();
                        const key = `marks.${subject}`;
                        const marks = req.body.marks.split(',').map(function(item) {
                            return parseInt(item, 10);
                        })

                        collection.update({ id: userId }, {
                                $set: {
                                    ['marks.' + subject]: marks,
                                }
                            },
                            function(err, success) {
                                if (err) {
                                    throw err;
                                }
                            }
                        );
                        return res.redirect('/students/marks');
                    });
            }
        },
    };

    return controller;
};

module.exports = {
    init,
};
