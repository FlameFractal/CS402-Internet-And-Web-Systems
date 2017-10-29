var map, infoWindow;
function initMap() {
 // window.location = "file:///C:/Users/prasanna/Documents/Studies/Semester_7/web/CSD402_Internet_and_Web_Systems/lab3/index.html#googleMaps_higher";
 (document.getElementById('mapheading')).innerHTML = 'Top Stories in your LOCATION';
 var element = document.getElementById('googleMap'),
 style = window.getComputedStyle(element),
 vis = style.getPropertyValue('display');
 if(vis==="none"){
  element.style.display="block";
}else{
  element.style.display="none";
}
map = new google.maps.Map(document.getElementById('googleMap'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 19
});
infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}