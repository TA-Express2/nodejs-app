/* globals toastr, io, $ */

const socket = io();

socket.on('test', (msg) => {
    $.notify(msg.msg, {
        style: 'glass',
        className: 'error',
        position: 'bottom right',
    });
});
