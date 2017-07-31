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
            data.subjects.create(subject)
                // .then(data.teachers.findOrCreateBy(subject))
                //     console.log('subject', subject)
                // .then((dbSubject) => {
                //     console.log('dbSubject', dbSubject)
                // })
                .then(res.redirect('/subjects'))
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/subjects/form');
                });
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
