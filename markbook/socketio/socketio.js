const init = (server) => {
    const io = require('socketio')(server);
    return Promise.resolve(io);
};

module.exports = {
    init,
};
