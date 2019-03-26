//const parseString = require('xml2js').parseString;

const app = new Vue({
    el:'#app',

    data() {
        return {
            map: null,
            tileLayer: null,
            layers: [],
            weatherData: null,
        }
    },

    mounted() {
        this.initMap();
        this.initLayers();     
        this.connectForecastAPI(); 
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
         
        connectForecastAPI() {
            let lati = 48.8567
            let long = 2.3508
            let numDays = 5
            let url = 'http://api.apixu.com/v1/forecast.json?key=de6ba3e8d6da421881c132607192603&q=' + lati + ',' + long + '&days=' + numDays    //'http://api.apixu.com/v1/forecast.json?key=de6ba3e8d6da421881c132607192603&q=48.8567,2.3508&days=5'
            axios            
            .get(url) //days 0 to 10
            .then(response => { 
                console.log(response.data.forecast.forecastday[0])//gives current day data
                console.log(response.data.forecast.forecastday[0].day.avgtemp_c)
                console.log(response.data.forecast.forecastday[0].day.condition.text)
                console.log(response.data.forecast.forecastday[1])//gives tomorrows data
                console.log(response.data.forecast.forecastday[1].day.avgtemp_c)
                console.log(response.data.forecast.forecastday[1].day.condition.text)
            })
        }
    },

})