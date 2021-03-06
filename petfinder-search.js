const petfinderApiUrl = 'https://api.petfinder.com/pet.find?';
const petfinderApiKey = '9efdec91ddde1fb83e7d7af7fb5f03ee';
let offset = 0;

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
  let queryString = Object.keys(myObject).map(key => {
      return key + '=' + myObject[key];
  }
    ).join('&');
  return queryString;
}

function handlePets(results) {
  if (results.description.$t == undefined && results.contact.email.$t == undefined && results.media.photos == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
      <div class="petImage" style="background: url('images/default-image.jpg') center center/cover no-repeat">
      </div>
      <h2>${results.name.$t}</h2>
      </div>
    <div class="contactInfo contactBorder">
      <h3>Contact Info</h3>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>
    </div>`;
  } else if (results.description.$t == undefined && results.contact.phone.$t == undefined && results.media.photos == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
      <div class="petImage" style="background: url('images/default-image.jpg') center center/cover no-repeat">
      </div>
      <h2>${results.name.$t}</h2>
      </div>
    <div class="contactInfo contactBorder">
      <h3>Contact Info</h3>
      <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      </div>
    </div>`;
  } else if (results.description.$t == undefined && results.contact.email.$t == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
      <a href="${results.media.photos.photo[2].$t}" title="name: ${results.name.$t} | animal: ${results.animal.$t}" class="petlink">
      <div class="petImage" style="background: url('${results.media.photos.photo[2].$t}') center center/cover no-repeat">
      <div class="petimageoverlay"></div>
      </div>
      </a>
      <h2>${results.name.$t}</h2>
      </div>
    <div class="contactInfo contactBorder">
      <h3>Contact Info</h3>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>
    </div>`;
  } else if (results.description.$t == undefined && results.contact.phone.$t == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
      <a href="${results.media.photos.photo[2].$t}" title="name: ${results.name.$t} | animal: ${results.animal.$t}" class="petlink">
      <div class="petImage" style="background: url('${results.media.photos.photo[2].$t}') center center/cover no-repeat">
      <div class="petimageoverlay"></div>
      </div>
      </a>
      <h2>${results.name.$t}</h2>
      </div>
    <div class="contactInfo contactBorder">
      <h3>Contact Info</h3>
      <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      </div>
    </div>`;
  } else if (results.description.$t == undefined && results.media.photos == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
    <div class="petImage" style="background: url('images/default-image.jpg') center center/cover no-repeat">
    </div>
    <h2>${results.name.$t}</h2>
    </div>
    <div class="contactInfo contactBorder">
      <h3>Contact Info</h3>
      <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>
    </div>`;
  } else if (results.media.photos == undefined && results.contact.phone.$t == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
    <div class="petImage" style="background: url('images/default-image.jpg') center center/cover no-repeat">
    </div>
    <h2>${results.name.$t}</h2>
    </div>
      <div class="petDescription">
      <button class="clickToExpand">learn more</button>
      <p>${results.description.$t}</p>
    </div>
    <div class="contactInfo">
      <h3>Contact Info</h3>
      <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      </div>
    </div>`;
  } else if (results.media.photos == undefined && results.contact.email.$t == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
    <div class="petImage" style="background: url('images/default-image.jpg') center center/cover no-repeat">
    </div>
    <h2>${results.name.$t}</h2>
    </div>
      <div class="petDescription">
      <button class="clickToExpand">learn more</button>
      <p>${results.description.$t}</p>
    </div>
    <div class="contactInfo">
      <h3>Contact Info</h3>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>
    </div>`;
  } else if (results.media.photos == undefined) {
    return `<div class="pet">
    <div class='petnameandphoto'>
    <div class="petImage" style="background: url('images/default-image.jpg') center center/cover no-repeat">
    </div>
    <h2>${results.name.$t}</h2>
    </div>
      <div class="petDescription">
      <button class="clickToExpand">learn more</button>
      <p>${results.description.$t}</p>
    </div>
    <div class="contactInfo">
      <h3>Contact Info</h3>
      <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>
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
    <div class="contactInfo">
      <h3>Contact Info</h3>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>
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
    <div class="contactInfo">
      <h3>Contact Info</h3>
      <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      </div>
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
    <div class="contactInfo contactBorder">
      <h3>Contact Info</h3>
      <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>
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
    <div class="contactInfo">
      <h3>Contact Info</h3>
      <p>email: <a href="mailto:${results.contact.email.$t}">${results.contact.email.$t}</a></p>
      <p>phone: <a href="tel:${results.contact.phone.$t}">${results.contact.phone.$t}</a></p>
      </div>
    </div>`;
  }
  }

function returnResults(data) {
  const petResults = data.petfinder.pets.pet;
  let numberOfPets = data.petfinder.lastOffset.$t;
  let integerOfPets = Number(numberOfPets);
  if (numberOfPets == '1') {
    let petfinderResults = handlePets(petResults);
    $('.results').prop('hidden', false).html(petfinderResults);
  } else {
    let petfinderResults = petResults.map((item, index) => handlePets(item));
    $('.results').prop('hidden', false).html(petfinderResults);
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
    let location = $('.myLocation').val() + ', ' + $('.stateSelect').val();
    let age = $('#ageOfAnimal').val();
    $('.petvetbuttons, .petResults').removeClass('hidden');
    $('.reset').fadeIn();
    // let count = 30;
    offset = 0;
    let elmnt = document.getElementById('petvetbuttons');
    elmnt.scrollIntoView({behavior: 'smooth', block: "start"});
    getDataFromPetfinderApi(animal, size, sex, location, age, offset, returnResults);
  });
}

// new page of results effect

function nextResults() {
    let animal = $('.animalType > input:checked').val();
    let size = $('#sizeOfAnimal').val();
    let sex = $('#sexOfAnimal').val();
    let location = $('.myLocation').val() + ', ' + $('.stateSelect').val();
    let age = $('#ageOfAnimal').val();
    offset += 30;
    console.log(offset);
    getDataFromPetfinderApi(animal, size, sex, location, age, offset, returnResults);
}

function previousResults() {
    let animal = $('.animalType > input:checked').val();
    let size = $('#sizeOfAnimal').val();
    let sex = $('#sexOfAnimal').val();
    let location = $('.myLocation').val() + ', ' + $('.stateSelect').val();
    let age = $('#ageOfAnimal').val();
    offset -= 30;
    console.log(offset);
    getDataFromPetfinderApi(animal, size, sex, location, age, offset, returnResults);
}

$(function(){
  $('.petResults').on('click', '.next', nextResults);
  $('.petResults').on('click', '.previous', previousResults);
});

$(searchForAPet);
