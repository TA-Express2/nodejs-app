/* globals process */

const async = () => {
    return Promise.resolve();
};

const config = require('./config');
const http = require('http');
const port = normalizePort(process.env.PORT || config.port);
// const seed = require('./db/users.json');

async()
    .then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.set('port', port);
        const server = http.createServer(app);
        require('./socketio').init(server)
        .then((io) => {
            app.io = io;
        });
        app.listen(config.port, () => console.log(`Listening at: ${config.port}`));
    });

function normalizePort(val) {
    const portInt = parseInt(val, 10);

    if (isNaN(portInt)) {
        return val;
    }

    if (portInt >= 0) {
        return portInt;
    }

    return false;
}
