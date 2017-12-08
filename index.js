const petfinderApiUrl = 'http://api.petfinder.com/pet.find?';
const petfinderApiKey = '9efdec91ddde1fb83e7d7af7fb5f03ee';
const googlePlacesApiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const googlePlaceApiKey = 'AIzaSyAT4j5vM5eSZxVy7qCcgr8B0FbxE1Q-CYA';

function getDataFromPetfinderApi(pickAnimal, pickSize, pickSex, enterLocation, pickAge) {
  const paramsObj = {
    format: 'json',
    key: petfinderApiKey,
    animal: pickAnimal,
    size: pickSize,
    sex: pickSex,
    location: enterLocation,
    age: pickAge,
    callback: '?'
  };
  let queryParams = buildQueryString(paramsObj);
  let url = petfinderApiUrl + queryParams;
  $.getJSON(url, function (data) {
    handlePets(data);
  });
}

// function getDataFromGooglePlacesApi() {
//   const paramsObj2 = {
//     query: 'veterinarian in Indiana',
//     key: googlePlaceApiKey,
//     callback: '?'
//   };
//   // let queryParams = buildQueryString(paramsObj2);
//   // let url = googlePlacesApiUrl + buildQueryString(paramsObj2);
//   $.getJSON(googlePlacesApiUrl, paramsObj2, function (data) {
//     console.log(data.results.name);
// });
// }

function buildQueryString(myObject) {
  let queryString = Object.keys(myObject).map( (e) => {
      return e + '=' + myObject[e];
  }
    ).join('&');
  return queryString;
}

function handlePets(pets) {
  if (pets.petfinder.pets.pet[1].description.$t == undefined) {
    $('.results').html(`<p>${pets.petfinder.pets.pet[1].name.$t}</p>
      <img src="${pets.petfinder.pets.pet[1].media.photos.photo[1].$t}"/>
      <p></p>`);
  } else {
  $('.results').html(`<p>${pets.petfinder.pets.pet[1].name.$t}</p>
    <img src="${pets.petfinder.pets.pet[1].media.photos.photo[1].$t}"/>
    <p>${pets.petfinder.pets.pet[1].description.$t}</p>`);
  }
}

function renderGoogleResults (result) {
  console.log(result.name);
}

function consoleLogGoogleStuff (data) {
  const googleResults = data.results.map(result => renderGoogleResults(result))
}

function searchForAPet() {
  $('form').submit(function (event) {
    event.preventDefault();
    const animal = $('.typeOfAnimal').val();
    const size = $('.sizeOfAnimal').val();
    const sex = $('.sexOfAnimal').val();
    const zipCode = $('.myZipCode').val();
    const age = $('.agoOfAnimal').val();
    getDataFromPetfinderApi(animal, size, sex, zipCode, age);
  });
}

$(searchForAPet);
