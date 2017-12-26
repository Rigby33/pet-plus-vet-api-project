var map;
var infowindow;
var service;

function initMap () {
  var centerMap = {lat: 40.2672, lng: -86.1349};
  map = new google.maps.Map(document.getElementById('map'), {
    center: centerMap,
    zoom: 10,
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    $('#vetResults').prop('hidden', false).show();
    let cityState = $('.myLocation').val() + ', ' + $('.stateSelect').val();
    let typeOfAnimal = $('.animalType > input:checked').val();
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(cityState), function(val) {
      var location = val.results[0].geometry.location;
      centerMap = {lat: location.lat, lng: location.lng};
      map = new google.maps.Map(document.getElementById('map'), {
        center: centerMap,
        zoom: 10,
      });
      var request = {
        location: centerMap,
        radius: '100',
        query: 'Veterinarian',
      };
      if (typeOfAnimal == 'bird' || typeOfAnimal == 'reptile' || typeOfAnimal == 'smallfurry') {
        var request = {
          location: centerMap,
          radius: '100',
          query: 'Exotic Veterinarian',
        };
      }
      service.textSearch(request, callback);
    });
  });

  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var image = 'images/pin.png';
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: image,
  });
  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      console.log(result);
      var infoWindow = new google.maps.InfoWindow();
      let website = result.website;
      let rating = result.rating;
      console.log(website);
      if (website == undefined && rating == undefined) {
        infoWindow.setContent(`<div class="infowindow">
        <h4>${result.name}</h4>
        <p>${result.formatted_address}</p>
        <p><strong>phone:</strong> <a href="tel:${result.formatted_phone_number}">${result.formatted_phone_number}</a></p>
        <a href="${result.url}" class="getDirections" target="_blank">Get Directions</a>
        </div>`);
      } else if (website == undefined) {
        infoWindow.setContent(`<div class="infowindow">
        <h4>${result.name}</h4>
        <p>${result.formatted_address}</p>
        <p><strong>phone:</strong> <a href="tel:${result.formatted_phone_number}">${result.formatted_phone_number}</a></p>
        <p class="rating"><strong>Rating</strong></p>
        <p>${result.rating}/5</p>
        <a href="${result.url}" class="getDirections" target="_blank">Get Directions</a>
        </div>`);
      } else if (rating == undefined) {
        infoWindow.setContent(`<div class="infowindow">
        <h4>${result.name}</h4>
        <p>${result.formatted_address}</p>
        <p><strong>phone:</strong> <a href="tel:${result.formatted_phone_number}">${result.formatted_phone_number}</a></p>
        <p><a href="${result.website}" target="_blank">${result.website}</a></p>
        <a href="${result.url}" class="getDirections" target="_blank">Get Directions</a>
        </div>`);
      } else {
        infoWindow.setContent(`<div class="infowindow">
        <h4>${result.name}</h4>
        <p>${result.formatted_address}</p>
        <p><strong>phone:</strong> <a href="tel:${result.formatted_phone_number}">${result.formatted_phone_number}</a></p>
        <p><a href="${result.website}" target="_blank">${result.website}</a></p>
        <p class="rating"><strong>Rating</strong></p>
        <p>${result.rating}/5</p>
        <a href="${result.url}" class="getDirections" target="_blank">Get Directions</a>
        </div>`);
      }
      infoWindow.open(map, marker);
    });
  });
}
