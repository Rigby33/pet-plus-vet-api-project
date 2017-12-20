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
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#aee2e0"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#abce83"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#769E72"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7B8758"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#EBF4A4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#8dab68"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#5B5B3F"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ABCE83"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#A4C67D"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#9BBF72"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#EBF4A4"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#87ae79"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7f2200"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            },
            {
                "weight": 4.1
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#495421"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
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
