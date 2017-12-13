function expandDescription() {
  $('.results').on('click', '.clickToExpand', function (event) {
    $(this).siblings('p').slideToggle();
    $(this).toggleClass('active');
  });
}

// function addActiveToRadio() {
//   $('form').on('click', '.animalType > input', function() {
//     if ($('.animalType > input').is('[checked]')) {
//       console.log('bye')
//     }
//   });
// }

// $(addActiveToRadio);

$(expandDescription);
