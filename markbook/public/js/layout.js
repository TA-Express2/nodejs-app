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

            $('#modalUserNumber').val($(`#${id} td.number`).text());
            $('#modalUserName').val($(`#${id} td.name`).text());
            $('#modalUserGrade').val($(this).parent().prev().attr('class').split(' ')[1]);
            $('#modalSubject').val($(this).parent().prev().attr('class').split(' ')[0]);
            $('#marks').val($(this).parent().prev().text());
        });
    });

    $(function() {
        $('.saveEditMarksButton').on('click', function(e) {
            e.preventDefault(e);
            $('#saveEditMarks')[0].submit();

            $('#myModal').modal('hide');
        });
    });

    $(function() {
        $('.editSubjectButton').on('click', function() {
            const id = $(this).data('id');
            $('#modalSubjectName').val($(`tr#${id} td.subject`).text());
            $('#modalTeacherName').val($(`tr#${id} td.teacher`).text());
        });
    });

    $(function() {
        $('.saveSubjectButton').on('click', function(e) {
            e.preventDefault(e);
            $('#editSubject')[0].submit();
            $('#subjectModal').modal('hide');
        });
    });

    $(function() {
        $('.deleteSubjectButton').on('click', function() {
            const id = $(this).data('id');
            $(`#${id}`).remove();
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
