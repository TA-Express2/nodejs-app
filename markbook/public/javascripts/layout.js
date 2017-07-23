/* globals toastr, io, $ */

$(document).ready(function() {
    $('ul.nav li.dropdown').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });
});

$(document).scroll(function() {
  if (document.body.scrollTop > 40) {
    $('nav.navbar').addClass('bg-gradient');
  } else {
    $('nav.navbar').removeClass('bg-gradient');
  }
});
