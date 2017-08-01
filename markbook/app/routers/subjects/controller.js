const init = (data) => {
    const controller = {
        getAllSubjects(req, res) {
            return data.subjects.getAll()
                .then((subjects) => {
                    return res.render('subjects/listAll', {
                        title: 'Subjects',
                        model: subjects,
                    });
                });
        },
        addSubjectForm(req, res) {
            return res.render('subjects/form');
        },
        addSubject(req, res) {
            const subject = req.body;
            data.subjects.create(subject);
            if (subject.teacher) {
                const firstName = subject.teacher.split(' ')[0];
                const lastName = subject.teacher.split(' ')[1];
                data.teachers.findBUserNames(firstName, lastName)
                    .then((dbTeacher) => {
                        data.teachers.collection
                        .update({ _id: dbTeacher._id }, {
                            $push: {
                                subjects: subject.subject,
                            },
                        });
                    })
                    .catch((err) => {
                        req.flash('error', err);
                        return res.redirect('/subjects/form');
                    });
            }
            res.redirect('/subjects');
        },
        editSubject(req, res) {
            if (req.user && req.user.role === 'admin') {
                return data.subjects.findByName(req.body.subjectName)
                    .then((subject) => {
                        data.subjects.collection.update({ _id: subject._id }, {
                            $set: {
                                'subject': req.body.subjectName,
                                'teacher': req.body.teacher,
                            },
                        });
                        if (subject.teacher) {
                            const firstName = subject.teacher.split(' ')[0];
                            const lastName = subject.teacher.split(' ')[1];
                            data.teachers.findBUserNames(firstName, lastName)
                                .then((dbTeacher) => {
                                    data.teachers.collection
                                    .update({ _id: dbTeacher._id }, {
                                        $push: {
                                            subjects: subject.subject,
                                        },
                                    });
                                })
                                .catch((err) => {
                                    req.flash('error', err);
                                    return res.redirect('/subjects/form');
                                });
                        }
                        res.redirect('/subjects');
                    });
            }
            return res.redirect('/subjects');
        },
    };
    return controller;
};

module.exports = {
    init,
};
