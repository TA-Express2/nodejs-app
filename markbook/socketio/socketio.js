const init = (server) => {
const io = require('socket.io').listen(server);
io.clients = [];

io.on('connection', (socket) => {
    console.log('socket connection started');
    socket.on('my other event', (data) => {
        console.log(data);
        socket.emit('messages', { hello: 'world' });
    });
});

return Promise.resolve(io);
};

module.exports = {
    init,
};
