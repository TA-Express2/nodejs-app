/* eslint-disable no-console */


const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const { MongoClient } = require('mongodb');

gulp.task('server:start', () => {
    return require('./server');
});

gulp.task('pre-test', () => {
    return gulp.src([
        './data/*.js',
        './app/**/*.js',
        './config/**/*.js',
        './db/**/*.js',
        './models/**/*.js',
        './server.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
        './test/unit/**/*.js',
    ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports());
});


const config = {
    connectionString: 'mongodb://localhost/items-db-test',
    port: 3002,
};

gulp.task('server-start', () => {
    return Promise.resolve()
        .then(() => require('./db').init(config.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
        app.set('port', config.port);
        app.listen(config.port, () => console.log(`Listening at: ${config.port}`));
        });
});

gulp.task('server-stop', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

gulp.task('tests:functional', ['server-start'], () => {
    return gulp.src('./test/functional/**/*.js')
        .pipe(mocha({
            reporter: 'nyan',
            timeout: 50000,
        }))
        .once('end', () => {
            gulp.start('server-stop');
        });
});
