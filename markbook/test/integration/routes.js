const { init } = require('../../app/app');
const request = require('supertest');

const { expect } = require('chai');

describe('TESTING ROUTES', () => {
    const connectionString = 'mongodb://localhost/items-db-test';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('Testing auth routes', () => {
        it('expect GET /login to return 200', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect POST /login to return 302 Redirect', (done) => {
            request(app)
                .post('/login')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /logout to return 302 Redirect', (done) => {
            request(app)
                .get('/logout')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('Testing home routes', () => {
        it('expect GET / to return 200', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /home to return 200', (done) => {
            request(app)
                .get('/home')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('Testing markbook routes', () => {
        it('expect GET /grades to return 200', (done) => {
            request(app)
                .get('/grades')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /:grade to return 302 Redirect if not logged in', (done) => {
            request(app)
                .get('/markbook/12A')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect POST /:grade to return 302 Redirect if not logged in', (done) => {
            request(app)
                .post('/markbook/12A')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('Testing students routes', () => {
        it('expect GET /students to return 200', (done) => {
            request(app)
                .get('/students')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect POST /students to return 302', (done) => {
            request(app)
                .post('/students')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /students/form to return 302 if not logged in', (done) => {
            request(app)
                .get('/students/form')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /students/:id to return 200', (done) => {
            request(app)
                .get('/students/S0001')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /students/edit/:id to return 200', (done) => {
            request(app)
                .get('/students/edit/S0001')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect POST /students/edit/:id to return 302', (done) => {
            request(app)
                .post('/students/edit/S0001')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /students/marks to return 200', (done) => {
            request(app)
                .get('/students/marks')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('Testing teachers routes', () => {
        it('expect GET /teachers to return 200', (done) => {
            request(app)
                .get('/teachers')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect POST /teachers to return 302', (done) => {
            request(app)
                .post('/teachers')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /teachers/form to return 302', (done) => {
            request(app)
                .get('/teachers/form')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /teachers/:id to return 200', (done) => {
            request(app)
                .get('/teachers/T0001')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /teachers/edit/:id to return 200', (done) => {
            request(app)
                .get('/teachers/edit/T0001')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect POST /teachers/edit/:id to return 302', (done) => {
            request(app)
                .post('/teachers/edit/T0001')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
    describe('Testing users routes', () => {
        it('expect GET /changePassword to return 302', (done) => {
            request(app)
                .get('/changePassword')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect POST /changePassword to return 302', (done) => {
            request(app)
                .post('/changePassword')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
        it('expect GET /profile to return 302', (done) => {
            request(app)
                .get('/profile')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});

