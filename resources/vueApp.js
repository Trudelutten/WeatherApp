const app = new Vue({
    el:'#app',

    data() {
        return {
            map: null,
            tileLayer: null,
            layers: [],
        }
    },

    mounted() {
        this.initMap();
        this.initLayers();      
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
        },
        initLayers() {},
    },

})