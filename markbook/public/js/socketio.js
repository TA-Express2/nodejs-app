/* globals toastr, io, $ */

const socket = io();

socket.on('new-marks', (msg) => {
    const string = msg.user + ' added new marks in ' + msg.forum;
    toastr.info(string, 'New marks');
});
