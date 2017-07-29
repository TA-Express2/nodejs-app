const { MongoClient, ObjectID } = require('mongodb');

const init = (data) => {
    const controller = {
        saveMarks(req, res) {
            console.log(req.body)
            const studentNumber = req.body.studentNumber;
            return data.students.findByNumber(studentNumber)
                .then((student) => {
                    data.students.collection.update( {
                        'number': studentNumber,
                        'marks.name': req.body.subject,
                    }, {
                        $set: {
                            ['marks.$.' + req.body.subject]: req.body.marks,
                        },
                    });
                    res.redirect(`/markbook/${req.body.studentGrade}`);
                });
        },
        getMarkbookByGrade(req, res) {
            return MongoClient.connect('mongodb://localhost/markbook')
                .then(async (db) => {
                    const grade = req.params;
                    const collectionStudents = db.collection('students');
                    let subjects = await collectionStudents.distinct('marks.name', { grade: grade.grade });
                    subjects = subjects.sort( { 'name': 1 } );
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
        },
    };
    return controller;
};

module.exports = {
    init,
};
