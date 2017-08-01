/* globals toastr, io, $ */

const socket = io();

socket.on('new-marks', (msg) => {
    const string = 'New marks added: ' + msg.marks;
    toastr.info(string, 'New marks');
});
