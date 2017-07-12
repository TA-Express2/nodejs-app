$(document).scroll(function() {
  if (document.body.scrollTop > 40) {
    $('nav.navbar').addClass('bg-gradient');
  } else {
    $('nav.navbar').removeClass('bg-gradient');
  }
});
