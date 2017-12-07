const petfinderApiUrl = 'http://api.petfinder.com/pet.find?';
const petfinderApiKey = '9efdec91ddde1fb83e7d7af7fb5f03ee';

function getDataFromApi(pickAnimal, pickSize, pickSex, enterLocation, pickAge) {
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
    let thepets = data.petfinder.pets.pet;
    $('.results').append(`<p>${thepets.name.$t}</p>`)
  });
}

function buildQueryString(myObject) {
  let queryString = Object.keys(myObject).map( (e) => {
      return e + '=' + myObject[e];
  }
    ).join('&');
  return queryString;
}

function handlePets(pets) {
  // do stuff with your pets object
  for (let i = 0; i < pets.length; ++i) {
    console.log(pets[i].name.$t);
  }
}

function searchForAPet() {
  $('form').submit(function (event) {
    event.preventDefault();
    const animal = $('.typeOfAnimal').val();
    const size = $('.sizeOfAnimal').val();
    const sex = $('.sexOfAnimal').val();
    const zipCode = $('.myZipCode').val();
    const age = $('.agoOfAnimal').val();
    getDataFromApi(animal, size, sex, zipCode, age)
  });
}

$(searchForAPet);
