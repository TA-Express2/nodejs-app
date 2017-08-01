const { MongoClient, ObjectID } = require('mongodb');

const init = (app, data) => {
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
                            app.io.emit('new-marks', {
                            marks: req.body.marks,
                        });
                        res.redirect(`/markbook/${req.body.studentGrade}`);
                    });
            }
            return res.redirect(`/login`);
        },
        getMarkbookByGrade(req, res) {
            if (req.user && (req.user.role === 'admin' || req.user.role === 'teacher')) {
                // return MongoClient.connect('mongodb://localhost/markbook')
                const grade = req.params;
                return data.students.getDistinctMarks('marks.name', { grade: grade.grade })
                    .then((subjects) => {
                        // const collectionStudents = db.collection('students');
                        // let  = await collectionStudents.distinct('marks.name', { grade: grade.grade });
                        subjects = subjects.sort({ 'name': 1 });
                        // console.log(subjects);
                        return data.students.filterByGradeAndSortAsc(grade)
                            .then((student) => {
                                if (!student) {
                                    return res.render('noUser', {
                                        title: 'No such a grade',
                                    });
                                }
                                return res.render('markbook/markbook', {
                                    subjects: subjects,
                                    students: student,
                                    grade: grade,
                                    title: 'Markbook',
                                });
                            });
                    });
            }
            return res.redirect(`/login`);
        },
    };
    return controller;
};

module.exports = {
    init,
};
