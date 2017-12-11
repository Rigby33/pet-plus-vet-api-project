const petfinderApiUrl = 'http://api.petfinder.com/pet.find?';
const petfinderApiKey = '9efdec91ddde1fb83e7d7af7fb5f03ee';

function getDataFromPetfinderApi(pickAnimal, pickSize, pickSex, enterLocation, pickAge, callback) {
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
  // $.getJSON(url, function (data) {
  //   handlePets(data);
  // });
  $.getJSON(url, callback);
}



function buildQueryString(myObject) {
  let queryString = Object.keys(myObject).map( (e) => {
      return e + '=' + myObject[e];
  }
    ).join('&');
  return queryString;
}

// function handlePets(pets) {
//   const listOfPets = pets.petfinder.pets.pet;
//   console.log(listOfPets);
//   for (let i = 0; i < listOfPets.length; i++) {
//     if (pets.petfinder.pets.pet[i].description.$t == undefined) {
//       $('.results').append(`<h2>${pets.petfinder.pets.pet[i].name.$t}</h2>
//         <img src="${pets.petfinder.pets.pet[i].media.photos.photo[1].$t}"/>
//         <h3>Contact Info</h3>
//         <p>email: <a href="mailto:${pets.petfinder.pets.pet[i].contact.email.$t}">${pets.petfinder.pets.pet[i].contact.email.$t}<a></p>
//         <p>phone: <a href="tel:${pets.petfinder.pets.pet[i].contact.phone.$t}">${pets.petfinder.pets.pet[i].contact.phone.$t}<a></p>`);
//     } else {
//       $('.results').append(`<p>${pets.petfinder.pets.pet[i].name.$t}</p>
//         <img src="${pets.petfinder.pets.pet[i].media.photos.photo[1].$t}"/>
//         <p>${pets.petfinder.pets.pet[i].description.$t}</p>
//         <h3>Contact Info</h3>
//         <p>email: <a href="mailto:${pets.petfinder.pets.pet[i].contact.email.$t}">${pets.petfinder.pets.pet[i].contact.email.$t}<a></p>
//         <p>phone: <a href="tel:${pets.petfinder.pets.pet[i].contact.phone.$t}">${pets.petfinder.pets.pet[i].contact.phone.$t}<a></p>`);
//       }
//     }
//   }

function handlePets(results) {
  if (results.contact.phone.$t == undefined && results.description.$t == undefined) {
    return `<h2>${results.name.$t}</h2>
      <img src="${results.media.photos.photo[1].$t}"/>
      <h3>Contact Info</h3>
      <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}<a></p>`;
  } else if (results.contact.email.$t == undefined && results.description.$t == undefined) {
    return `<h2>${results.name.$t}</h2>
      <img src="${results.media.photos.photo[1].$t}"/>
      <h3>Contact Info</h3>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}<a></p>`;
  } else if (results.description.$t == undefined) {
      return `<h2>${results.name.$t}</h2>
        <img src="${results.media.photos.photo[1].$t}"/>
        <h3>Contact Info</h3>
        <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}<a></p>
        <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}<a></p>`;
    } else if (results.contact.phone.$t == undefined) {
      return `<h2>${results.name.$t}</h2>
        <img src="${results.media.photos.photo[1].$t}"/>
        <p>${results.description.$t}</p>
        <h3>Contact Info</h3>
        <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}<a></p>`;
    } else if (results.contact.email.$t == undefined) {
      return `<h2>${results.name.$t}</h2>
        <img src="${results.media.photos.photo[1].$t}"/>
        <p>${results.description.$t}</p>
        <h3>Contact Info</h3>
        <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}<a></p>`;
    } else {
      return `<h2>${results.name.$t}</h2>
        <img src="${results.media.photos.photo[1].$t}"/>
        <p>${results.description.$t}</p>
        <h3>Contact Info</h3>
        <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}<a></p>
        <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}<a></p>`;
    }
  }

function returnResults(data) {
  console.log(data.petfinder.pets.pet);
  let petResults = data.petfinder.pets.pet;
  const petfinderResults = petResults.map((item, index) => handlePets(item));
  $('.results').html(petfinderResults);
}

function searchForAPet() {
  $('form').submit(function (event) {
    event.preventDefault();
    const animal = $('.typeOfAnimal').val();
    const size = $('.sizeOfAnimal').val();
    const sex = $('.sexOfAnimal').val();
    const zipCode = $('.myZipCode').val();
    const age = $('.agoOfAnimal').val();
    getDataFromPetfinderApi(animal, size, sex, zipCode, age, returnResults);
  });
}

$(searchForAPet);
