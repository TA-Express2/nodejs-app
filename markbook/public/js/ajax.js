/* globals $ */

$(document).ready(function() {
    $(function() {
        $.ajax({
                method: 'GET',
                url: '/grades',
                success: function(data) {},
                error: function(err) {
                    throw err;
                },
            })
            .done(function(data) {
                $('#gradesDropdownItems').empty();
                data.forEach((el) => {
                    const a = $('<a>').addClass('dropdown-item gradesItem').attr('href', '/markbook/' + el).attr('id', el).text(el);
                    $('#gradesDropdownItems').append(a);
                });
        });
    });
});
