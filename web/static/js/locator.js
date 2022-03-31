var map;
var markers = [];
var infoWindow;
var locationSelect;


function initMap() {
    var edinburgh = { lat: 55.95714408561746, lng: -3.1888611020565825 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: edinburgh,
        zoom: 8,
    });
    showStockistMarkers();
};


function showStockistMarkers() {
    stockists.forEach(function(stockist) {
        var latlng = new google.maps.LatLng(
            stockist.coordinates.latitude,
            stockist.coordinates.longitude
        );
        var name = stockist.name;
        var postcode = stockist.postcode;
        var slug = stockist.slug;
        createMarker(latlng, name, postcode, slug);
    });
};


function createMarker(latlng, name, postcode, slug) {
    var html = "<b>" + name + "</b> <br/>" + postcode;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng
    });
    var infoWindow = new google.maps.InfoWindow({
        content: html
    });
    marker.addListener('mouseover', function() {
        infoWindow.open(map, marker);
    });
     marker.addListener('mouseout', function() {
        infoWindow.close();
    });
    marker.addListener('click', function() {
        window.location.assign("http://localhost/" + slug);
    });
    markers.push(marker);
};