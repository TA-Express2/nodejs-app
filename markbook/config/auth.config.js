const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');
const auth = require('passport-local-authenticate');
const users = require('../data/users.data')

const { MongoClient } = require('mongodb');
const MongoStore = require('connect-mongo')(session);

const configAuth = (app, { users }) => {
    return MongoClient.connect('mongodb://localhost/markbook')
        .then(async (db) => {
            const collectionAdmins = db.collection('admins');
            const adminsList = await collectionAdmins.find().toArray();

            const collectionStudents = db.collection('students');
            const studentsList = await collectionStudents.find().toArray();

            const collectionTeachers = db.collection('teachers');
            const teachersList = await collectionTeachers.find().toArray();

            let usersList = [];
            usersList.push(adminsList);
            usersList.push(studentsList);
            usersList.push(teachersList);

            passport.use(new Strategy({
                    usernameField: 'username',
                    passwordField: 'password',
                },
                (username, password, done) => {
                    return users.findByUsername(username, usersList)
                        .then((user) => {
                            console.log(user.password);
                            if (user.hashPassword !== password) {
                                done(new Error('Invalid password!'));
                            }
                            return done(null, user);
                        })
                        .catch((err) => {
                            return done(err);
                        });
                }
            ));
            app.use(cookieParser());
            app.use(session({
                secret: 'Secret Key',
                maxAge: new Date(Date.now() + 60 * 60 * 1000),
                store: new MongoStore({ db },
                    (err) => {
                        console.log(err || 'connect-mongodb setup ok');
                    }),
            }));
            app.use(passport.initialize());
            app.use(passport.session());

            passport.serializeUser((user, done) => {
                done(null, user._id);
            });

            passport.deserializeUser((id, done) => {
                return users.findById(id, usersList)
                    .then((user) => {
                        done(null, user);
                    })
                    .catch(done);
            });
        });
};

module.exports = configAuth;
