/* globals $ */

$(document).ready(function() {
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });

    $(function() {
        $('.editMarksButton').on('click', function() {
            const id = $(this).data('id');
            const subject = $(this).parent().attr('class');

            $.ajax({
                method: "GET",
                url: "http://localhost:3000/students/marks/editMarks",
                dataType: "json",
                data: { id: id },
                success: function(data) {},
                error: function(err) {
                    console.log(err);
                },
            }).done(function(data) {
                $('#modalUserID').text(data['_id']);
                $('#modalUserNumber').text(data['number']);
                $('#modalUsername').text(data['firstName'] + ' ' + data['lastName']);
                $('#subject').text(subject.toUpperCase());
                const index = data.marks.findIndex(obj => obj[[subject[0].toUpperCase() + subject.substr(1)]]);
                $('#indexSubject').text(index);
                $('#marks').val(data['marks'][index][subject[0].toUpperCase() + subject.substr(1).toLowerCase()]);
            });
        });
    });

    $(function() {
        $('.saveEditMarksButton').on('click', function(e) {
            e.preventDefault();

            const id = $('#modalUserID').text();
            const subject = $('#subject').text()[0].toUpperCase() + $('#subject').text().substr(1).toLowerCase();
            const marks = $('#marks').val();
            const index = $('#indexSubject').text();

            $.ajax({
                method: "POST",
                url: "http://localhost:3000/students/marks/saveMarks",
                dataType: 'json',
                data: {
                    "id": id,
                    "subject": subject,
                    "marks": marks,
                    "index": index,
                },
                success: function(success) {},
                error: function(err) {
                    console.log(err);
                },
            });
            $('#myModal').modal('hide');
        });
    });
    $('#myModal').on('hidden.bs.modal', function() {
        location.reload();
    });
});

$(document).scroll(function() {
    if (document.body.scrollTop > 40) {
        $('nav.navbar').addClass('bg-gradient');
    } else {
        $('nav.navbar').removeClass('bg-gradient');
    }
});
