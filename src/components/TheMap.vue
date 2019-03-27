<template>
  <div>
    <!--Inputfield to enter City of intrest-->
    <input v-model="cityName" placeholder="Enter city of intrest">
    <p>City is: {{ cityName }}</p>
    <button v-on:click="connectAPICityName">Enter</button>
    <h1>Map here:</h1>
    <div id="map" class="map"></div>
  </div>
</template>



<script>
export default {
  data: () => ({
    map: null,
    tileLayer: null,
    popup: L.popup(),
    locations: [
      {
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
    ],

    layers: [],
    weatherData: null,
    currentLatitude: 59.91, //Oslo by default
    currentLongitude: 10.75, //Oslo by default
    currentLocationData: {
      place: null,
      temperatureNow: null,
      weatherNow: null,
      weatherIconNow: null,
      weatherForecast1Day: null,
      temperatureForecast1Day: null,
      weatherIconForecast1Day: null
    },
    cityName: "",
    numDays: 10,
    cityCoordinates: []
  }),

  mounted() {
    this.initMap();
    this.markCoordinates();
    this.initLayers();
    this.connectForecastAPI();
  },

  methods: {
    initMap() {
      this.map = L.map("map").setView([59.91, 10.75], 5);

      this.tileLayer = L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
        {
          maxZoom: 18,
          accessToken:
            "pk.eyJ1IjoiYW5leGlzIiwiYSI6ImNqdHByOWs5dTA3MWozeWswbGI0dm1ucXIifQ.Jy0fvqCbGACxx4GdJMC09w",
          id: "mapbox.streets",
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        }
      );

      this.tileLayer.addTo(this.map);
      this.map.on("click", this.onMapClick);
    },

    markCoordinates() {
      // Make all markers on map
      for (const location of this.locations) {
        location.marker = L.marker(location.coordinate).addTo(this.map);
        // Add a pop-up to each marker when clicked upon
        location.marker
          .bindPopup("<b>Weather in " + location.name + ":</b>")
          .openPopup();
      }
    },
    async onMapClick(e) {
      this.currentLatitude = e.latlng.lat;
      this.currentLongitude = e.latlng.lng;
      await this.connectForecastAPI();

      console.log("Latitude: " + e.latlng.lat + ", Longitude: " + e.latlng.lng);

      // On map click, the popup is showing the following information:

      this.popup
        .setLatLng(e.latlng)
        .setContent(
          "Nearest place of interest: <b>" +
            this.currentLocationData.place +
            "</b><br>Temperature today: " +
            this.currentLocationData.temperatureNow +
            " &degC <br>" +
            this.currentLocationData.weatherNow +
            "<br> <img src=" +
            this.currentLocationData.weatherIconNow +
            ">" +
            "</b><br>Temperature tomorrow: " +
            this.currentLocationData.temperatureForecast1Day +
            " &degC <br>" +
            this.currentLocationData.weatherForecast1Day +
            "<br> <img src=" +
            this.currentLocationData.weatherIconForecast1Day +
            ">"
        )
        .openOn(this.map);
    },
    initLayers() {},

    async connectForecastAPI() {
      let url =
        "http://api.apixu.com/v1/forecast.json?key=de6ba3e8d6da421881c132607192603&q=" +
        this.currentLatitude +
        "," +
        this.currentLongitude +
        "&days=" +
        this.numDays; //'http://api.apixu.com/v1/forecast.json?key=de6ba3e8d6da421881c132607192603&q=48.8567,2.3508&days=5'
      await axios
        .get(url) //days 0 to 10
        .then(response => {
          this.currentLocationData.place = response.data.location.name;
          // Storing current weather data:
          this.currentLocationData.temperatureNow =
            response.data.forecast.forecastday[0].day.avgtemp_c;
          this.currentLocationData.weatherNow =
            response.data.forecast.forecastday[0].day.condition.text;
          this.currentLocationData.weatherIconNow =
            response.data.forecast.forecastday[0].day.condition.icon;
          // storing tomorrows weather data:
          this.currentLocationData.temperatureForecast1Day =
            response.data.forecast.forecastday[1].day.avgtemp_c;
          this.currentLocationData.weatherForecast1Day =
            response.data.forecast.forecastday[1].day.condition.text;
          this.currentLocationData.weatherIconForecast1Day =
            response.data.forecast.forecastday[1].day.condition.icon;

          console.log(response.data.forecast.forecastday[0]); //gives current day data
          console.log(response.data.forecast.forecastday[0].day.avgtemp_c);
          console.log(response.data.forecast.forecastday[0].day.condition.text);
          console.log(response.data.forecast.forecastday[0].day.condition.icon);
          console.log(response.data.location.name);
          console.log(response.data.forecast.forecastday[1]); //gives tomorrows data
          console.log(response.data.forecast.forecastday[1].day.avgtemp_c);
          console.log(response.data.forecast.forecastday[1].day.condition.text);
          console.log(response.data.forecast.forecastday[1].day.condition.icon);
        });
    },
    async connectAPICityName() {
      this.cityName = this.cityName.toLowerCase().replace(/ /g, "_");
      let url =
        "http://api.apixu.com/v1/forecast.json?key=de6ba3e8d6da421881c132607192603&q=" +
        this.cityName +
        "&days=" +
        this.numDays;
      console.log(url);
      await axios
        .get(url) //days 0 to 10
        .then(response => {
          this.currentLocationData.place = response.data.location.name;
          // Storing current weather data:
          this.currentLocationData.temperatureNow =
            response.data.forecast.forecastday[0].day.avgtemp_c;
          this.currentLocationData.weatherNow =
            response.data.forecast.forecastday[0].day.condition.text;
          this.currentLocationData.weatherIconNow =
            response.data.forecast.forecastday[0].day.condition.icon;
          // Storing tomorrows weather data:
          this.currentLocationData.temperatureForecast1Day =
            response.data.forecast.forecastday[1].day.avgtemp_c;
          this.currentLocationData.weatherForecast1Day =
            response.data.forecast.forecastday[1].day.condition.text;
          this.currentLocationData.weatherIconForecast1Day =
            response.data.forecast.forecastday[1].day.condition.icon;

          //Clear city coordinates for new request
          this.cityCoordinates = [];
          //Set coordinates for popup
          this.cityCoordinates.push(response.data.location.lat);
          this.cityCoordinates.push(response.data.location.lon);
        });
      console.log("popup coord: " + this.cityCoordinates);
      this.popup
        .setLatLng(this.cityCoordinates)
        .setContent(
          "Nearest place of interest: <b>" +
            this.currentLocationData.place +
            "</b><br>Temperature today: " +
            this.currentLocationData.temperatureNow +
            " &degC <br>" +
            this.currentLocationData.weatherNow +
            "<br> <img src=" +
            this.currentLocationData.weatherIconNow +
            ">" +
            "</b><br>Temperature tomorrow: " +
            this.currentLocationData.temperatureForecast1Day +
            " &degC <br>" +
            this.currentLocationData.weatherForecast1Day +
            "<br> <img src=" +
            this.currentLocationData.weatherIconForecast1Day +
            ">"
        )
        .openOn(this.map);
    }
  }
};
</script>

<style>
.map {
  height: 600px;
  width: 800px;
  max-height: 80%;
  max-width: 80%;
}
</style>
