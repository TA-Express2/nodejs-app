const init = (app, data) => {
    const controller = {
        getAll(req, res) {
            // return data.students.getAll()
            //     .then((students) => {
                    return res.render('students', {
                        // model: students,
                        title: 'Students',
                    });
                // });
        },
    };

    return controller;
};

module.exports = {
    init,
};
