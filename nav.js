// Initialize the map
var map = L.map('map').fitWorld();

// Add a tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Destination coordinates
var destination = L.latLng(13.069706, 77.582314);

// Locate the user's current position and set the view
map.locate({setView: true, maxZoom: 15});

// Add routing control from the user's location to the destination
function onLocationFound(e) {
    L.Routing.control({
        waypoints: [
            L.latLng(e.latitude, e.longitude), // User's current location
            destination // Destination point
        ],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim() // Adding geocoder control
    }).addTo(map);

    // Add a marker at the destination
    L.marker(destination).addTo(map)
        .bindPopup("Destination: 13.084447, 77.594912").openPopup();
}

// Handle location errors
function onLocationError(e) {
    alert("Unable to retrieve your location. " + e.message);
}

// Event listeners for location found and error handling
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);