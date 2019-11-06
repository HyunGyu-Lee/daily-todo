<template>
  <v-app app clipped>
    <!-- <v-app-bar app dark color="indigo" clipped-left>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo/logo-white.png"
          transition="scale-transition"
          width="100" height="48"
        /> 
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/HyunGyu-Lee/daily-todo"
        target="_blank"
        text
      >
        <span class="mr-2">contact</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-row justify="center">
      <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo/logo-colored.png"
          transition="scale-transition"
          width="480" height="360"
        />        
    </v-row>
    <v-row justify="center" class="mt-0">
      Simple & Powerful
    </v-row>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-bottom-navigation v-model="bottomNav" shift>
      <v-btn :to="{name: 'todoPage'}">
        <span>ToDo</span><v-icon>mdi-newspaper-variant-multiple</v-icon>
      </v-btn>
      <v-btn to="/bookmarks">
        <span>Bookmark</span><v-icon>mdi-book-open-variant</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    bottomNav: 0
  }),
  created () {
    // this.$vuetify.theme.dark = false
  }
};
</script>

<style scoped>
#app-title {

}
</style>
