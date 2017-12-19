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
    $('#vetResults').show();
    let city = $('.myLocation').val();
    let typeOfAnimal = $('.animalType > input:checked').val();
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address="+encodeURIComponent(city), function(val) {
      var location = val.results[0].geometry.location;
      centerMap = {lat: location.lat, lng: location.lng};
      map = new google.maps.Map(document.getElementById('map'), {
        center: centerMap,
        zoom: 10,
        styles: [
                    {elementType: 'geometry', stylers: [{color: '#c1cfdb'}]},
                    {elementType: 'labels.text.stroke', stylers: [{color: '#ffffff'}]},
                    {elementType: 'labels.text.fill', stylers: [{color: '#332724'}]},
                    {
                      featureType: 'poi',
                      elementType: 'geometry.fill',
                      stylers: [{color: '#bdcc62'}]
                    },
                    {
                      featureType: 'road',
                      elementType: 'geometry',
                      stylers: [{color: '#ffffff'}]
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'geometry',
                      stylers: [{color: '#ed9077'}]
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'geometry.stroke',
                      stylers: [{color: '#ed5e36'}]
                    },
                    {
                      featureType: 'road.highway',
                      elementType: 'labels.text.fill',
                      stylers: [{color: '#f3d19c'}]
                    },
                    {
                      featureType: 'transit',
                      elementType: 'geometry',
                      stylers: [{color: '#91b4cf'}]
                    },
                    {
                      featureType: 'transit.station',
                      elementType: 'labels.text.fill',
                      stylers: [{color: '#d59563'}]
                    },
                    {
                      featureType: 'water',
                      elementType: 'geometry',
                      stylers: [{color: '#4885b0'}]
                    },
                    {
                      featureType: 'water',
                      elementType: 'labels.text.fill',
                      stylers: [{color: '#515c6d'}]
                    },
                    {
                      featureType: 'water',
                      elementType: 'labels.text.stroke',
                      stylers: [{color: '#17263c'}]
                    }
                  ]
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
      let website = result.website;
      let rating = result.rating;
      console.log(website);
      if (website == undefined && rating == undefined) {
        infoWindow.setContent(`<div class="infowindow">
        <h4>${result.name}</h4>
        <p>${result.formatted_address}</p>
        <p><strong>phone:</strong> <a href="tel:${result.formatted_phone_number}">${result.formatted_phone_number}</a></p>
        </div>`);
      } else if (website == undefined) {
        infoWindow.setContent(`<div class="infowindow">
        <h4>${result.name}</h4>
        <p>${result.formatted_address}</p>
        <p><strong>phone:</strong> <a href="tel:${result.formatted_phone_number}">${result.formatted_phone_number}</a></p>
        <p class="rating"><strong>Rating</strong></p>
        <p>${result.rating}/5</p>
        </div>`);
      } else if (rating == undefined) {
        infoWindow.setContent(`<div class="infowindow">
        <h4>${result.name}</h4>
        <p>${result.formatted_address}</p>
        <p><strong>phone:</strong> <a href="tel:${result.formatted_phone_number}">${result.formatted_phone_number}</a></p>
        <p><a href="${result.website}">${result.website}</a></p>
        </div>`);
      } else {
        infoWindow.setContent(`<div class="infowindow">
        <h4>${result.name}</h4>
        <p>${result.formatted_address}</p>
        <p><strong>phone:</strong> <a href="tel:${result.formatted_phone_number}">${result.formatted_phone_number}</a></p>
        <p><a href="${result.website}">${result.website}</a></p>
        <p class="rating"><strong>Rating</strong></p>
        <p>${result.rating}/5</p>
        </div>`);
      }
      infoWindow.open(map, marker);
    });
  });
}
