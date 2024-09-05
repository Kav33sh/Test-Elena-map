// Initialize the map
var map = L.map('map').fitWorld();

// Tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Mapbox access token (replace 'your_mapbox_access_token' with your actual Mapbox token)
var mapboxAccessToken = 'your_mapbox_access_token';

// Mapbox Traffic Layer
var trafficLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/traffic-night-v2/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    attribution: 'Traffic data © Mapbox',
    maxZoom: 19,
});

// Add the traffic control layer to the map
L.control.layers(null, {
    'Traffic': trafficLayer
}).addTo(map);

// Define the Elena Geo coordinates
var elenaGeoLocation = L.latLng(13.069706, 77.582314);

// Add a marker for Elena Geo
L.marker(elenaGeoLocation).addTo(map)
    .bindPopup("Elena Geo: 13.069706, 77.582314").openPopup();

// Locate the user's current position and set the view
map.locate({ setView: true, maxZoom: 15 });

// Routing control from the user's location to Elena Geo
function onLocationFound(e) {
    L.Routing.control({
        waypoints: [
            L.latLng(e.latitude, e.longitude), // User's current location
            elenaGeoLocation // Elena Geo location
        ],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim() // Adding geocoder control
    }).addTo(map);

    // Marker at Elena Geo location
    L.marker(elenaGeoLocation).addTo(map)
        .bindPopup("Elena Geo: 13.069706, 77.582314").openPopup();
}

// Location errors
function onLocationError(e) {
    alert("Unable to retrieve your location. " + e.message);
}

// Loading screen hides after 5 seconds
setTimeout(function() {
    document.getElementById('loading-screen').style.display = 'none';
}, 5000); // 5000 milliseconds = 5 seconds

// Handle location events
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

