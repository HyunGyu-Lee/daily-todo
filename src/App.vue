<template>
  <v-app>
    <v-app-bar app dark color="indigo" clipped-left>
      <div class="d-flex align-center">
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo/logo-white.png"
          transition="scale-transition"
          width="96" height="48"
        />  -->
      </div>
        <h3>@DAILYTODO</h3>
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/HyunGyu-Lee/daily-todo"
        target="_blank"
        text
      >
        <span class="mr-2">contact</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height pl-8 pr-8" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-bottom-navigation v-model="bottomNav" app background-color="indigo" grow dark shift fixed>
      <v-btn :to="{name: 'todoPage'}" height="100%">
        <span>ToDo</span><v-icon>mdi-newspaper-variant-multiple</v-icon>
      </v-btn>
      <v-btn to="/bookmarks" height="100%">
        <span>Bookmark</span><v-icon>mdi-book-open-variant</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- Global Notification Message -->
    <v-snackbar v-model="alerts.visible" top multi-line :timeout="alerts.timeout">
      {{alerts.message}}
      <v-btn dark text @click="alerts.visible = false">Close</v-btn>
    </v-snackbar>

    <!-- Global Loading Overay -->
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    bottomNav: 0,
    alerts: {
      message: '',
      visible: false,
      timeout: 2000
    },
    loading: false
  }),
  created () {
    // Listen show alert request
    this.$app.EventBus.$on('toast', (message) => {
      this.alerts.visible = false
      this.alerts.message = message
      this.alerts.visible = true
    })

    // Listen show loading request
    this.$app.EventBus.$on('setLoadingState', (loadingState) => {
      this.loading = loadingState
    });
  }
};
</script>