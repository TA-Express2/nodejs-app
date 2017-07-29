/* globals socket, $ */

$(document).ready(function() {
    const newMarksContainer = '.sidenav';
    let speed = 0;

    socket.on('new-marks', (msg) => {
        loadMarksStructure();
    });

    loadMarksStructure();

    function loadMarksStructure() {
        const host = window.location.hostname;
        const protocol = location.protocol;
        const url = protocol + '//' + host +
            (location.port ? ':' + location.port : '') +
            '/students/marks/saveMarks';

        $.ajax({
            url: url,
            type: 'GET',
            tryCount: 0,
            retryLimit: 3,
            timeout: 5000,
            async: true,
            success: (data) => {
                $(newMarksContainer).stop().fadeOut(speed, function() {
                    $(newMarksContainer).html(data);
                    $(newMarksContainer).stop().fadeIn(speed);
                });
                speed = 400;
            },
            error: (xhr, status, error) => {
                this.tryCount++;
                if (status === 'timeout') {
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                    }
                }

                $(newMarksContainer)
                    .html('Can\'t load the new marks');
                return;
            },
        });
    }
});
