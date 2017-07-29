const init = (data) => {
    const controller = {
        getAllTeachers(req, res) {
            return data.teachers.getAll()
                .then((teachers) => {
                    return res.render('teachers/listAll', {
                        model: teachers,
                    });
                });
        },
        addTeacherForm(req, res) {
            return res.render('teachers/form');
        },
        addTeacher(req, res) {
            const teacher = req.body;
            data.teachers.create(teacher)
                .then(async (dbTeacher) => {
                    const count = (await data.teachers.getCollectionCount()).toString();
                    const pad = '0000';
                    const number = 'T' + pad.substring(0, pad.length - count.length) + count;
                    data.teachers.collection.update({ _id: dbTeacher._id }, {
                        $set: {
                            number: number,
                        },
                    })
                    .then(data.users.create({
                        email: teacher.email,
                        hashPassword: teacher.egn,
                        egn: teacher.egn,
                        role: 'teacher',
                    }))
                    .catch(function(err) {
                        throw err;
                    });
                    res.redirect('/teachers');
                });
        },
        getTeacherById(req, res) {
            return data.teachers.findByNumber(req.params.id)
                .then((teacher) => {
                    if (!teacher) {
                        return res.render('users/noUser', {
                            title: 'Teacher not found!',
                        });
                    }
                    return res.render('teachers/teacher', {
                        model: teacher,
                    });
                });
        },
        showTeacherById(req, res) {
            return data.teachers.findByNumber(req.params.id)
                .then((teacher) => {
                    return res.render('teachers/edit', {
                        model: teacher,
                    });
                })
                .catch(function(err) {
                    throw err;
                });
        },
        editTeacherById(req, res) {
            return data.teachers.findByNumber(req.params.id)
                .then((teacher) => {
                    data.teachers.updateTeacher(teacher, req.body);
                    data.teachers.collection.update({ _id: teacher._id }, {
                        $set: {
                            role: 'teacher',
                            number: req.params.id,
                        },
                    });
                    res.redirect('/teachers');
                });
        },
    };

    return controller;
};

module.exports = {
    init,
};
