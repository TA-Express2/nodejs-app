const { MongoClient, ObjectID } = require('mongodb');

const init = (data) => {
    const controller = {
        viewChangeUserPassword(req, res) {
            return res.render('users/changePassword', {
                title: 'Enter new password',
            });
        },
        changeUserPassword(req, res) {
            if (req.body.password !== req.body.confirmPassword) {
                return res.render('users/noUser', {
                    title: 'Both passwords are not the same!',
                });
            }
            return data.users.collection.update({ _id: req.user._id }, {
                        $set: {
                            hashPassword: req.body.password,
                        },
                        $unset: {
                            egn: '',
                        },
                    })
                .then(res.redirect('/'));
        },
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
