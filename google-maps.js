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
    $('#map').show();
    let city = $('.myLocation').val();
    let typeOfAnimal = $('.animalType > input:checked').val();
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(city), function(val) {
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
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    service.getDetails(place, function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      console.log(result);
      var infoWindow = new google.maps.InfoWindow();
      infoWindow.setContent(`<p>${result.name}</p><p>${result.formatted_address}</p><p><a href="tel:${result.formatted_phone_number}">${result.formatted_phone_number}</a></p>`);
      infoWindow.open(map, marker);
    });
  });
}
