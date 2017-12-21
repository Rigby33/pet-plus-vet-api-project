// smooth scroll to anchors
function smoothScroll() {
  $("a").on('click', function(event) {
    if (this.hash !== '') {
      event.preventDefault();
      let hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
        window.location.hash = hash;
      });
    }
  });
}

// expand and collapse pet descriptions
function expandDescription() {
  $('.results').on('click', '.clickToExpand', function (event) {
    $(this).siblings('p').slideToggle();
    $(this).toggleClass('active');
    $('.pet').css('display:block');
  });
}

// background slide show
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
    $('.slide').fadeOut(3000);
    $('.slide' + num).fadeIn(1000);
  }
}

function slideOutHeroSection() {
  $('.heroButton').on('click', function() {
    $('.herosection').slideUp();
    $('header').slideUp();
    $('main').slideUp();
    $('.slideShow').slideUp(function() {
      $('.slideShow').addClass('fullheight');
    });
    $('.overlay').addClass('darker');
    $('.animalForm').slideUp(function() {
      $(this).removeClass('hidden');
    });
  });
}

// show more filtering options on form
function moreFilterOptions() {
  $('.filters').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass('showFilters');
    // $('.sizeAgeSex').toggleClass('hidden');
    $('.sizeAgeSex').parent().slideToggle();
    // $('.sizeAgeSex').toggleClass('flexDisplay');
  })
}

// fade in and out scroll to top button and go to vet results button
function fadeinOnScroll() {
  $(window).scroll(function() {
    if($(this).scrollTop() > 2000) {
      $('.scrollbackdiv').fadeIn();
      $('.gotovetresultsdiv').fadeIn();
    } else {
      $('.scrollbackdiv').fadeOut();
      $('.gotovetresultsdiv').fadeOut();
    }
  });
}

// light box function
function lightboxRun() {
  $('.results').on('click', '.petnameandphoto .petlink', function (event) {
    event.preventDefault();
    console.log('hi');
    let petimage = $(event.currentTarget).attr('href');
    let altTag = $(event.currentTarget).attr('title');
    const item = `<div class="lightbox"><button class="close"><i class="fa fa-times-circle" aria-hidden="true"></i></button><img src="${petimage}" alt="${altTag}"/></div>`;
    $('.lightboxcontainer').hide().html(item).fadeIn();
    closeLightBox();
  });
}

// close lightbox function
function closeLightBox () {
  $('.lightbox').on('click', '.close', function (event) {
    $('.lightbox').fadeOut();
  });
  $('.lightbox').on('click', function (event) {
    $('.lightbox').fadeOut();
  });
}

function revealSearchButton() {
  $('form').on('click', function() {
    let textInput = $('.myLocation').val();
  if($('.animalType > input').is(':checked')) {
    $('.formbuttons').slideDown(function() {$('.formbuttons').removeClass('hidden')}
  );
  }
});
}

// run all of the functions

$(revealSearchButton);
$(slideOutHeroSection);
$(lightboxRun);
$(fadeinOnScroll);
$(moreFilterOptions);
$(slideShow);
$(expandDescription);
$(smoothScroll);
