const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');
const auth = require('passport-local-authenticate');

const { MongoClient } = require('mongodb');
const MongoStore = require('connect-mongo')(session);

const configAuth = (app, { users }) => {
    return MongoClient.connect('mongodb://localhost/app')
        .then(async(db) => {
            const collection = db.collection('students');
            const usersList = await collection.find().toArray();
            //console.log(usersList)

            passport.use(new Strategy({
                    usernameField: 'username',
                    passwordField: 'password',
                },
                (username, password, done) => {
                    //console.log(typeof(usersList));
                    //console.log(usersList)
                    //console.log(`usersList in auth.config = ${usersList[0].info}`);
                    return users.findByUsername(username, usersList)
                        .then((user) => {
                            //console.log(user.password);
                            if (user.password !== password) {
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
                done(null, user.id);
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