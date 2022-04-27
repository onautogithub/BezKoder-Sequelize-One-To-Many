<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        bezKoder
      </div>
      <v-btn to="/tutorials" text>
        Tutorials
      </v-btn>
      <v-btn to="/add" text>
        Add
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>
