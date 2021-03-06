const passport = require('passport');
const cookieParser = require('cookie-parser');
const { Strategy } = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('../../config');
require('passport-local-authenticate');

const configAuth = (app, data) => {
    passport.use(new Strategy({
        usernameField: 'email',
        passwordField: 'password',
        },
        (email, password, done) => {
            data.users.checkPassword(email, password)
                .then((user) => {
                    done(null, user);
                })
                .catch((err) => {
                    done(err);
                });
        }
    ));
    app.use(cookieParser());
    app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: 'Secret Key',
        maxAge: new Date(Date.now() + 60 * 60 * 1000),
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(require('connect-flash')());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};

module.exports = { configAuth };
