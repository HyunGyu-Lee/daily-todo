<template>
  <v-app app clipped>
    <v-app-bar app clipped-left>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <span id="app-title">Daily TODO</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/HyunGyu-Lee/daily-todo"
        target="_blank"
        text
      >
        <span class="mr-2">Contribute</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <TodoList />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TodoList from '@/components/TodoList';

export default {
  name: 'App',
  components: {
    TodoList,
  },
  data: () => ({
    //
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
};
</script>

<style scoped>
#app-title {

}
</style>
