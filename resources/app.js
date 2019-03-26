
/* Set map centered around Oslo */
var mymap = L.map('mapid').setView([59.91, 10.75], 5);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidHJ1ZGVsdXR0IiwiYSI6ImNqdHBpamhmNDAwenQzem1yank0am4zMG4ifQ.HgWpqZdDLyb-lU1T_t9R2Q'
}).addTo(mymap);

const coordinates = { 
    "Oslo": {
        coordinate: [59.91, 10.75],
        marker: null
    },
    "Stockholm": {
        coordinate: [59.32, 18.07],
        marker: null
    },
    "Cophenhagen": {
        coordinate: [55.67, 12.57],
        marker: null},
    "Bergen": {
        coordinate: [60.4, 5.32],
        marker: null
    }
}

// Make all markers on map
const coordKeys = Object.keys(coordinates)
for (const coordKey of coordKeys) {
    coordinates[coordKey].marker = L.marker(coordinates[coordKey].coordinate).addTo(mymap);
    // Add a pop-up to each marker when clicked upon
    coordinates[coordKey].marker.bindPopup("<b>Weather in " +  coordKey + ":</b>").openPopup();
    
}




var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);


