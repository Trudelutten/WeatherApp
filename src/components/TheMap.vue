<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense v-for="location in locations" :key="location.name">
        <!-- List element : -->
        <v-list-tile @click="goToCity(location.name)">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="location.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- NavBar -->
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Weather App</v-toolbar-title>
    </v-toolbar>

    <!-- Body -->
    <v-container>
      <v-layout text-xs-center wrap>
        <v-flex mb-4>
          <!--Input - City Search-->
          <v-flex xs12 sm6 md3>
            <v-text-field v-model="cityName" label="City" placeholder="Name"></v-text-field>
            <v-btn v-on:click="connectAPICityName">Enter</v-btn>
          </v-flex>
          <!--<input v-model="cityName" placeholder="Enter city of intrest">
          <button v-on:click="connectAPICityName">Enter</button>-->
        </v-flex>

        <!-- The Map -->
        <v-flex mb-5 xs12>
          <v-layout justify-center>
            <div id="map" class="map"></div>
          </v-layout>
        </v-flex>

        <!-- The Info Cards 
        NOT DONE-->
      </v-layout>
      <!--Name of location-->
      <v-card>
        <v-card-title>
          {{
          this.weatherData && this.weatherData.location.name
          }}
        </v-card-title>
      </v-card>
      <!--Display forcast data in Cards-->
      <v-card>
        <v-card-title>
          {{
          this.weatherData && this.weatherData.forecast.forecastday[0].date
          }}
        </v-card-title>
        <v-card-text>
          {{
          this.weatherData &&
          this.weatherData.forecast.forecastday[0].day.avgtemp_c
          }}
        </v-card-text>
        <v-card-text>
          {{
          this.weatherData &&
          this.weatherData.forecast.forecastday[0].day.condition.text
          }}
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          {{
          this.weatherData && this.weatherData.forecast.forecastday[1].date
          }}
        </v-card-title>
        <v-card-text>
          {{
          this.weatherData &&
          this.weatherData.forecast.forecastday[1].day.avgtemp_c
          }}
        </v-card-text>
        <v-card-text>
          {{
          this.weatherData &&
          this.weatherData.forecast.forecastday[1].day.condition.text
          }}
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          {{
          this.weatherData && this.weatherData.forecast.forecastday[2].date
          }}
        </v-card-title>
        <v-card-text>
          {{
          this.weatherData &&
          this.weatherData.forecast.forecastday[2].day.avgtemp_c
          }}
        </v-card-text>
        <v-card-text>
          {{
          this.weatherData &&
          this.weatherData.forecast.forecastday[2].day.condition.text
          }}
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-title>
          {{
          this.weatherData && this.weatherData.forecast.forecastday[3].date
          }}
        </v-card-title>
        <v-card-text>
          {{
          this.weatherData &&
          this.weatherData.forecast.forecastday[3].day.avgtemp_c
          }}
        </v-card-text>
        <v-card-text>
          {{
          this.weatherData &&
          this.weatherData.forecast.forecastday[3].day.condition.text
          }}
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    map: null,
    tileLayer: null,
    popup: global.L.popup(),
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
        name: "Copenhagen",
        coordinate: [55.67, 12.57],
        marker: null
      },
      {
        name: "London",
        coordinate: [51.50722, -0.1275],
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
    cityName: "Oslo",
    numDays: 10,
    cityCoordinates: []
  }),

  mounted() {
    this.initMap();
    this.initLayers();
    this.connectForecastAPI();
  },

  methods: {
    initMap() {
      this.map = global.L.map("map").setView([59.91, 10.75], 10);

      this.tileLayer = global.L.tileLayer(
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
    /*markCoordinates() {
      // Make all markers on map
      for (const location of this.locations) {
        location.marker = global.L.marker(location.coordinate).addTo(this.map);
        // Add a pop-up to each marker when clicked upon
        location.marker
          .bindPopup("<b>Weather in " + location.name + ":</b>")
          .openPopup();
      }
    },*/
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
      await global.axios
        .get(url) //days 0 to 10
        .then(response => {
          //To store all the forcast data
          this.weatherData = response.data;
          console.log(response.data.forecast.forecastday[0].day.condition.icon);

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
          /*
            console.log(response.data.forecast.forecastday[0]); //gives current day data
            console.log(response.data.forecast.forecastday[0].day.avgtemp_c);
            console.log(
              response.data.forecast.forecastday[0].day.condition.text
            );
            console.log(
              response.data.forecast.forecastday[0].day.condition.icon
            );
            console.log(response.data.location.name);
            console.log(response.data.forecast.forecastday[1]); //gives tomorrows data
            console.log(response.data.forecast.forecastday[1].day.avgtemp_c);
            console.log(
              response.data.forecast.forecastday[1].day.condition.text
            );
            console.log(
              response.data.forecast.forecastday[1].day.condition.icon
            );*/
        });
      //this.printForecast();
    },
    async connectAPICityName() {
      this.cityName = this.cityName.toLowerCase().replace(/ /g, "_");
      let url =
        "http://api.apixu.com/v1/forecast.json?key=de6ba3e8d6da421881c132607192603&q=" +
        this.cityName +
        "&days=" +
        this.numDays;
      await global.axios
        .get(url) //days 0 to 10
        .then(response => {
          //To store all the forcast data
          this.weatherData = response.data;

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
      //this.printForecast();
    },
    goToCity(cityName) {
      this.cityName = cityName;
      this.connectAPICityName();
    }
    /*
    printForecast() {
      let i = 0;

      while (i < 6) {
        console.log("Date:" + this.weatherData.forecast.forecastday[i].date);
        console.log(
          "Temp: " + this.weatherData.forecast.forecastday[i].day.avgtemp_c
        );
        console.log(
          "Condition: " +
            this.weatherData.forecast.forecastday[i].day.condition.text
        );
        i++;
      }
    }*/
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}

.map {
  max-height: 40vh;
  max-width: 100%;
  height: 100vh;
  width: 100vh;
  min-height: 300px;
  padding: 1px;
  border: 1px solid #021a40;
  z-index: 1;

  background: #000;
}

.card {
  background-color: #fff;
  min-width: 100%;
  min-height: 200px;
  display: flex;
  overflow-x: auto;
}
</style>
