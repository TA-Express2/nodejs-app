const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');
const auth = require('passport-local-authenticate');

//const { MongoClient } = require('mongodb');
//const MongoStore = require('connect-mongo')(session);

const configAuth = (app, { users }) => {
    //return MongoClient.connect('mongodb://localhost/items-auth')
        //.then((db) => {
            passport.use(new Strategy(
                (username, password, done) => {
                    return users.findByUsername(username)
                        .then((user) => {
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
                //maxAge: new Date(Date.now() + 60 * 60 * 1000),
                //store: new MongoStore({ db },
                //    (err) => {
                //        console.log(err || 'connect-mongodb setup ok');
                //    }),
            }));
            app.use(passport.initialize());
            app.use(passport.session());

            passport.serializeUser((user, done) => {
                done(null, user.id);
            });

            passport.deserializeUser((id, done) => {
                return users.findById(id)
                    .then((user) => {
                        done(null, user);
                    })
                    .catch(done);
            });
        //});
};

module.exports = configAuth;
