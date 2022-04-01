// Initialise global variables
let map;
let markers = [];
let infoWindow;
let locationSelect;

// Initialise the map with the coordinates of Edinburgh
function initMap() {
    let edinburgh = { lat: 55.95714408561746, lng: -3.1888611020565825 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: edinburgh,
        // Zoom in enough to show whole region
        zoom: 8,
    });
    // Function call for stockist markers
    showStockistMarkers();
};

// Function allows a marker to be placed on the initialised map for every stockist in stockistData.js
function showStockistMarkers() {
    stockists.forEach(function(stockist) {
        let latlng = new google.maps.LatLng(
            stockist.coordinates.latitude,
            stockist.coordinates.longitude
        );
        let name = stockist.name;
        let postcode = stockist.postcode;
        let slug = stockist.slug;
        // Create the marker using the above variables using stockistData.js
        createMarker(latlng, name, postcode, slug);
    });
};

// Function creates the marker and interactivity
function createMarker(latlng, name, postcode, slug) {
    // Create marker using map and coordinates
    let marker = new google.maps.Marker({
        map: map,
        position: latlng
    });
    // Set the inner html variable
    let html = "<b>" + name + "</b> <br/>" + postcode;
    // Create the info window which displays the inner html
    let infoWindow = new google.maps.InfoWindow({
        content: html
    });
    // Info window opens when mouse moves over marker
    marker.addListener('mouseover', function() {
        infoWindow.open(map, marker);
    });
    // Info window closes when mouse moves away from marker
     marker.addListener('mouseout', function() {
        infoWindow.close();
    });
    // User is taken to the stockist detail page when marker is clicked
    marker.addListener('click', function() {
        window.location.assign("http://localhost/" + slug);
    });
    markers.push(marker);
};