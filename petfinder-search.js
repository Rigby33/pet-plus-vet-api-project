const petfinderApiUrl = 'http://api.petfinder.com/pet.find?';
const petfinderApiKey = '9efdec91ddde1fb83e7d7af7fb5f03ee';

function getDataFromPetfinderApi(pickAnimal, pickSize, pickSex, enterLocation, pickAge, count, callback) {
  const paramsObj = {
    format: 'json',
    key: petfinderApiKey,
    animal: pickAnimal,
    size: pickSize,
    sex: pickSex,
    location: enterLocation,
    age: pickAge,
    offset: count,
    count: 30,
    callback: '?',
  };
  let queryParams = buildQueryString(paramsObj);
  let url = petfinderApiUrl + queryParams;
  $.getJSON(url, callback);
}

function buildQueryString(myObject) {
  let queryString = Object.keys(myObject).map( (e) => {
      return e + '=' + myObject[e];
  }
    ).join('&');
  return queryString;
}

function handlePets(results) {
  if (results.media.photos == undefined && results.description.$t == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
      <div class="petImage" style="background: url('images/default-image.jpg') center center/cover no-repeat">
      </div>
      <h2>${results.name.$t}</h2>
      </div>
      <h3>Contact Info</h3>
      <p>email: <a href="${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
    </div>`;
  } else if (results.media.photos == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
      <div class="petImage" style="background: url('images/default-image.jpg') center center/cover no-repeat"></div>
      <h2>${results.name.$t}</h2>
      </div>
      <div class="petDescription">
      <button class="clickToExpand">learn more</button>
      <p>${results.description.$t}</p>
    </div>
      <h3>Contact Info</h3>
      <p>email: <a href="${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
    </div>`;
  } else if (results.contact.phone.$t == undefined && results.description.$t == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
    <a href="${results.media.photos.photo[2].$t}" title="name: ${results.name.$t} | animal: ${results.animal.$t}" class="petlink">
      <div class="petImage" style="background: url('${results.media.photos.photo[2].$t}') center center/cover no-repeat">
      <div class="petimageoverlay"></div>
      </div>
      </a>
      <h2>${results.name.$t}</h2>
      </div>
      <h3>Contact Info</h3>
      <p>email: <a href="${results.contact.email.$t}">${results.contact.email.$t}</a></p>
    </div>`;
  } else if (results.contact.email.$t == undefined && results.description.$t == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
    <a href="${results.media.photos.photo[2].$t}" title="name: ${results.name.$t} | animal: ${results.animal.$t}" class="petlink">
      <div class="petImage" style="background: url('${results.media.photos.photo[2].$t}') center center/cover no-repeat">
      <div class="petimageoverlay"></div>
      </div>
      </a>
      <h2>${results.name.$t}</h2>
      </div>
      <h3>Contact Info</h3>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
    </div>`;
  } else if (results.description.$t == undefined) {
      return `<div class="pet">
      <div class='petnameandphoto'>
      <a href="${results.media.photos.photo[2].$t}" title="name: ${results.name.$t} | animal: ${results.animal.$t}" class="petlink">
        <div class="petImage" style="background: url('${results.media.photos.photo[2].$t}') center center/cover no-repeat">
        <div class="petimageoverlay"></div>
        </div>
        </a>
        <h2>${results.name.$t}</h2>
        </div>
        <h3>Contact Info</h3>
        <p>email: <a href="${results.contact.email.$t}">${results.contact.email.$t}</a></p>
        <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>`;
    } else if (results.contact.phone.$t == undefined) {
      return `<div class="pet">
      <div class='petnameandphoto'>
      <a href="${results.media.photos.photo[2].$t}" title="name: ${results.name.$t} | animal: ${results.animal.$t}" class="petlink">
        <div class="petImage" style="background: url('${results.media.photos.photo[2].$t}') center center/cover no-repeat">
        <div class="petimageoverlay"></div>
        </div>
        </a>
        <h2>${results.name.$t}</h2>
        </div>
        <div class="petDescription">
        <button class="clickToExpand">learn more</button>
        <p>${results.description.$t}</p>
      </div>
        <h3>Contact Info</h3>
        <p>email: <a href="${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      </div>`;
    } else if (results.contact.email.$t == undefined) {
      return `<div class="pet">
      <div class='petnameandphoto'>
      <a href="${results.media.photos.photo[2].$t}" title="name: ${results.name.$t} | animal: ${results.animal.$t}" class="petlink">
        <div class="petImage" style="background: url('${results.media.photos.photo[2].$t}') center center/cover no-repeat">
        <div class="petimageoverlay"></div>
        </div>
        </a>
        <h2>${results.name.$t}</h2>
        </div>
        <div class="petDescription">
        <button class="clickToExpand">learn more</button>
        <p>${results.description.$t}</p>
      </div>
        <h3>Contact Info</h3>
        <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>`;
    } else {
      return `<div class="pet">
      <div class='petnameandphoto'>
        <a href="${results.media.photos.photo[2].$t}" title="name: ${results.name.$t} | animal: ${results.animal.$t}" class="petlink">
        <div class="petImage" style="background: url('${results.media.photos.photo[2].$t}') center center/cover no-repeat">
        <div class="petimageoverlay"></div>
        </div>
        </a>
        <h2>${results.name.$t}</h2>
        </div>
        <div class="petDescription">
        <button class="clickToExpand">learn more</button>
        <p>${results.description.$t}</p>
      </div>
        <h3>Contact Info</h3>
        <p>email: <a href="${results.contact.email.$t}">${results.contact.email.$t}</a></p>
        <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>`;
    }
  }

function returnResults(data) {
  const petResults = data.petfinder.pets.pet;
  let numberOfPets = data.petfinder.lastOffset.$t;
  let integerOfPets = Number(numberOfPets);
  // let next = integerOfPets + 30;
  nextResults(integerOfPets);
  // let previous = integerOfPets - 30;
  previousResults(integerOfPets);
  // previousResults(previous);
  if (numberOfPets == '1') {
    let petfinderResults = handlePets(petResults);
    $('.results').html(petfinderResults);
  } else {
    let petfinderResults = petResults.map((item, index) => handlePets(item));
    $('.results').html(petfinderResults);
  }
}

function searchForAPet() {
  $('form').submit(function (event) {
    event.preventDefault();
    let animal = $('.animalType > input:checked').val();
    if (! $('.animalType > input').is(':checked')) {
      $('.required').show();
    }
    let size = $('#sizeOfAnimal').val();
    let sex = $('#sexOfAnimal').val();
    let myLocation = $('.myLocation').val();
    let age = $('#ageOfAnimal').val();
    $('.petvetbuttons, .petResults').removeClass('hidden');
    $('.reset').fadeIn();
    // let count = 30;
    let count = 0;
    let elmnt = document.getElementById('petvetbuttons');
    elmnt.scrollIntoView({behavior: 'smooth', block: "start"});
    getDataFromPetfinderApi(animal, size, sex, myLocation, age, count, returnResults);
  });
}

// new page of results effect

function nextResults(offset) {
  $('.petResults').on('click', '.next', function() {
    let animal = $('.animalType > input:checked').val();
    if (! $('.animalType > input').is(':checked')) {
      $('.required').show();
    }
    let size = $('#sizeOfAnimal').val();
    let sex = $('#sexOfAnimal').val();
    let myLocation = $('.myLocation').val();
    let age = $('#ageOfAnimal').val();
    offset += 30;
    console.log(offset);
    getDataFromPetfinderApi(animal, size, sex, myLocation, age, offset, returnResults);
  });
}

function previousResults(offset) {
  $('.petResults').on('click', '.previous', function() {
    let animal = $('.animalType > input:checked').val();
    if (! $('.animalType > input').is(':checked')) {
      $('.required').show();
    }
    let size = $('#sizeOfAnimal').val();
    let sex = $('#sexOfAnimal').val();
    let myLocation = $('.myLocation').val();
    let age = $('#ageOfAnimal').val();
    offset -= 30;
    console.log(offset);
    getDataFromPetfinderApi(animal, size, sex, myLocation, age, offset, returnResults);
  });
}

// infinite scroll type effect

// function nextResults(count) {
//   $('.petResults').on('click', '.next', function() {
//     let animal = $('.animalType > input:checked').val();
//     if (! $('.animalType > input').is(':checked')) {
//       $('.required').show();
//     }
//     let size = $('#sizeOfAnimal').val();
//     let sex = $('#sexOfAnimal').val();
//     let myLocation = $('.myLocation').val();
//     let age = $('#ageOfAnimal').val();
//     console.log(count);
//     getDataFromPetfinderApi(animal, size, sex, myLocation, age, count, returnResults);
//   });
// }
//
//
// function previousResults(count) {
//   $('.petResults').on('click', '.previous', function() {
//     let animal = $('.animalType > input:checked').val();
//     if (! $('.animalType > input').is(':checked')) {
//       $('.required').show();
//     }
//     let size = $('#sizeOfAnimal').val();
//     let sex = $('#sexOfAnimal').val();
//     let myLocation = $('.myLocation').val();
//     let age = $('#ageOfAnimal').val();
//     console.log(count);
//     getDataFromPetfinderApi(animal, size, sex, myLocation, age, count, returnResults);
//   });
// }

$(searchForAPet);
