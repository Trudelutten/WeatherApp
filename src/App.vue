<template>
  <v-app>
    <v-content>
      <!--<HelloWorld/>-->
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
    //HelloWorld,
    TheMap
  },
  data() {
    return {
      drawer: null
    };
  }
};
</script>


<style>
</style>