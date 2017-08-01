const { MongoClient, ObjectID } = require('mongodb');

const init = (data) => {
    const controller = {
        saveMarks(req, res) {
            if (req.user && (req.user.role === 'admin' || req.user.role === 'teacher')) {
                const studentNumber = req.body.studentNumber;
                return data.students.findByNumber(studentNumber)
                    .then((student) => {
                        data.students.collection.update({
                            'number': studentNumber,
                            'marks.name': req.body.subject,
                        }, {
                                $set: {
                                    ['marks.$.' + req.body.subject]: req.body.marks,
                                },
                            });
                        res.redirect(`/markbook/${req.body.studentGrade}`);
                    });
            }
            return res.redirect(`/login`);
        },
        getMarkbookByGrade(req, res) {
            const grade = req.params;
            let students;
            let subjects;
            if ( req.user && (req.user.role === 'admin' || req.user.role === 'teacher')) {
                const email = req.user.email;
                return data.students.filterByGradeAndSortAsc(grade)
                    .then((studs) => {
                        students = studs;
                        if (!students) {
                            return res.render('noUser', {
                                title: 'No such a grade',
                            });
                        }
                        return data.students.getDistinctMarks('marks.name', { grade: grade.grade })
                            .then((subj) => {
                                subjects = subj.sort( { 'name': 1 } );
                                if (req.user.role === 'admin') {
                                    return data.admins.findByEmail(email);
                                }
                                if (req.user.role === 'teacher') {
                                    return data.teachers.findByEmail(email);
                                }
                                if (req.user.role === 'student') {
                                    return data.students.findByEmail(email);
                                }
                            })
                            .then((currUser) => {
                                return res.render('markbook/markbook', {
                                    subjects: subjects,
                                    students: students,
                                    thisUser: currUser,
                                    grade: grade,
                                    title: 'Markbook',
                                });
                            });
                    });
            }
            return res.redirect(`/login`);
        },
        getAllGrades(req, res, next) {
            return data.students.gatherAllUniqProps('grade')
                .then((grades) => {
                    res.send(grades);
                });
        },
    };
    return controller;
};

module.exports = {
    init,
};
