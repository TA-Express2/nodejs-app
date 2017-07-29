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
    };

    return controller;
};

module.exports = {
    init,
};
