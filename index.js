$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

function expandDescription() {
  $('.results').on('click', '.clickToExpand', function (event) {
    $(this).siblings('p').slideToggle();
    $(this).toggleClass('active');
    $('.pet').css('display:block');
  });
}


function slideShow() {
  let activeDiv = 1;
  showDiv(activeDiv);
  let timer = setInterval(changeDiv, 5000);

  function changeDiv() {
    activeDiv++;
    if (activeDiv == 6) {
      activeDiv = 1;
    }
    showDiv(activeDiv);
  }

  function showDiv(num) {
    $('.slide').fadeOut(3000); // hide all
    $('.slide' + num).fadeIn(1000); // show active
  }
}

function moreFilterOptions() {
  $('.filters').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('showFilters')
    $('.sizeAgeSex').slideToggle(function() {
      $('.sizeAgeSex').toggleClass('hidden');
    });
    $('.sizeAgeSex').toggleClass('flexDisplay');
  })
}

$(window).scroll(function() {
  if($(this).scrollTop() > 2000) {
    $('.scrollbackdiv').fadeIn();
    $('.gotovetresultsdiv').fadeIn();
  } else {
    $('.scrollbackdiv').fadeOut();
    $('.gotovetresultsdiv').fadeOut();
  }
});

$(moreFilterOptions);
$(slideShow);
$(expandDescription);
