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
        getUserProfile(req, res) {
            if (req.user) {
                const role = req.user.role;
                const email = req.user.email;
                if (role === 'admin') {
                    return data.admins.findByEmail(email)
                        .then((user) => {
                            return res.render('users/profile', {
                            title: 'Your profile:',
                            dataUser: user,
                            role: role,
                            });
                        });
                }
                if (role === 'teacher') {
                    return data.teachers.findByEmail(email)
                        .then((user) => {
                            return res.render('users/profile', {
                            title: 'Your profile:',
                            dataUser: user,
                            role: role,
                            });
                        });
                }
                if (role === 'student') {
                    return data.students.findByEmail(email)
                        .then((user) => {
                            return res.render('users/profile', {
                            title: 'Your profile:',
                            dataUser: user,
                            role: role,
                            });
                        });
                }
            }
            return res.redirect('/login');
        },
    };
    return controller;
};

module.exports = {
    init,
};
