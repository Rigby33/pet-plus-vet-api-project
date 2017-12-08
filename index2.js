const petfinderApiUrl = 'http://api.petfinder.com/pet.find';
const petfinderApiKey = '9efdec91ddde1fb83e7d7af7fb5f03ee';

function getDataFromApi (pickAnimal, pickSize, pickSex, enterLocation, pickAge, callback) {
  const settings = {
    url: petfinderApiUrl,
    data: {
      key: petfinderApiKey,
      animal: `${pickAnimal}`,
      size: `${pickSize}`,
      sex: `${pickSex}`,
      location: `${enterLocation}`,
      age: `${pickAge}`,
      format: 'json'
    },
		dataType: 'jsonp',
    type: 'GET',
    success: callback,
  };
  $.getJSON(settings);
}

function renderAnimalsResults (result) {
  return `<div>
    <p>${result.animal}</div>`
}

function displayPets (data) {
  const searchResults = data.items.map((item, index) => renderYoutubeResults(item, nextPageToken, prevPageToken));
  $('.js-search-results').html(searchResults);
}

function searchForAPet () {
  $('form').submit(function (event) {
    event.preventDefault();
    const animal = $('.typeOfAnimal option').val();
    const size = $('.sizeOfAnimal > option').val();
    const sex = $('.sexOfAnimal > option').val();
    const zipCode = $('.myZipCode').val();
    const age = $('.agoOfAnimal > option').val();
    getDataFromApi(animal, size, sex, zipCode, age, display)
  });
  // console.log(getDataFromApi('cat', 'M', 'M', 46077, 'Young'))
}

$(searchForAPet);
