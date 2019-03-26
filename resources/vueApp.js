const app = new Vue({
    el:'#app',

    data() {
        return {
            map: null,
            tileLayer: null,
            popup: L.popup(),
            locations: [{
                    name: "Oslo",
                    coordinate: [59.91, 10.75],
                    marker: null
                },
                {
                    name: "Stockholm",
                    coordinate: [59.32, 18.07],
                    marker: null
                },
                {
                    name: "Cophenhagen",
                    coordinate: [55.67, 12.57],
                    marker: null
                },
                {
                    name: "Bergen",
                    coordinate: [60.4, 5.32],
                    marker: null
                }
                
            ]
        }
    },

    mounted() {
        this.initMap();
        this.markCoordinates();      
    },

    methods: {
        initMap() {
            this.map = L.map('map').setView([59.91, 10.75], 5);

            this.tileLayer = L.tileLayer(
                'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
                {
                  maxZoom: 18,
                  accessToken: 'pk.eyJ1IjoiYW5leGlzIiwiYSI6ImNqdHByOWs5dTA3MWozeWswbGI0dm1ucXIifQ.Jy0fvqCbGACxx4GdJMC09w',
                  id: 'mapbox.streets',
                  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                }
              );

            this.tileLayer.addTo(this.map);
                        


            this.map.on('click', this.onMapClick);



        },
        markCoordinates() {
            // Make all markers on map
            for (const location of this.locations) {
                location.marker = L.marker(location.coordinate).addTo(this.map);
                // Add a pop-up to each marker when clicked upon
                location.marker.bindPopup("<b>Weather in " +  location.name + ":</b>").openPopup();
                
            }
        },
        onMapClick(e) {
            console.log("Latitude: " + e.latlng.lat + ", Longitude: " + e.latlng.lng)
            this.popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(this.map);
        }
    },
})