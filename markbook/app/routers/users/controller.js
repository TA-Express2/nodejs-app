const { MongoClient, ObjectID } = require('mongodb');

const init = (data) => {
    const controller = {
        getStudentProfile(req, res) {
            if (req.user) {
                return res.render('users/profile', {
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
