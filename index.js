function expandDescription() {
  $('.results').on('click', '.clickToExpand', function (event) {
    $(this).siblings('p').slideToggle();
    $(this).toggleClass('active');
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

$(slideShow);
$(expandDescription);
