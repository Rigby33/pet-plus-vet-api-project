const petfinderApiUrl = 'https://api.petfinder.com/pet.find';
const petfinderApiKey = '9efdec91ddde1fb83e7d7af7fb5f03ee';

function getDataFromApi (pickAnimal, pickSize, pickSex, enterLocation, pickAge) {
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
		dataType: 'json',
    type: 'GET',

  };
  $.ajax(settings);
}

function searchForAPet () {
  $('form').submit(function (event) {
    event.preventDefault();
    const animal = $('.typeOfAnimal option').val();
    const size = $('.sizeOfAnimal > option').val();
    const sex = $('.sexOfAnimal > option').val();
    const zipCode = $('.myZipCode').val();
    const age = $('.agoOfAnimal > option').val();
    console.log(getDataFromApi(animal, size, sex, zipCode, age));
  });
  // console.log(getDataFromApi('cat', 'M', 'M', 46077, 'Young'))
}

$(searchForAPet);
