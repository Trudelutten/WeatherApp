<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Weather App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="#" target="_blank">
        <span class="mr-2">A VERY NICE BUTTON WITH A LINK</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <!-- <HelloWorld/> -->
      <TheMap/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import TheMap from "./components/TheMap";

export default {
  name: "App",
  components: {
    HelloWorld,
    TheMap
  },
  data() {
    return {
      //
    };
  }
};
</script>


<style>
</style>