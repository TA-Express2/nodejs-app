$(document).ready(function() {
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });

    $(function() {
        $('.editMarksButton').on('click', function() {
            const id = $(this).data('id');
            const subject = $(this).parent().attr('class')
            $.ajax({
                method: "GET",
                url: "http://localhost:3000/students/marks/editMarks",
                dataType: "json",
                data: { id: parseInt(id) },
                success: function(data) {},
                error: function(err) {}
            }).done(function(data) {
                $('#modalUserId').text(data[0]['id']);
                $('#modalUsername').text(data[0]['name']);
                $('#subject').text(subject.toUpperCase());
                $('#marks').val((data[0]['marks'][subject]));
            });
        });
    });

    $(function() {
        $('.saveEditMarksButton').on('click', function(e) {
            e.preventDefault();

            const id = $('#modalUserId').text();
            const subject = $(this).parent().attr('class');

            $.ajax({
                method: "POST",
                url: "http://localhost:3000/students/marks/saveMarks",
                dataType: 'json',
                data: {
                    "id": $('#modalUserId').text(),
                    "subject": $('#subject').text(),
                    "marks": $('#marks').val(),
                },
                success: function(success) {},
                error: function(err) {}
            });
            $('#myModal').modal('hide');
            location.reload();
        });
    });
});

$(document).scroll(function() {
    if (document.body.scrollTop > 40) {
        $('nav.navbar').addClass('bg-gradient');
    } else {
        $('nav.navbar').removeClass('bg-gradient');
    }
});
