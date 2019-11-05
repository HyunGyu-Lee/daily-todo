<template>
  <v-app app clipped>
    <v-app-bar app dark color="red lighten-2" clipped-left>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="36" height="36"
        />

        <span id="app-title"><b>Daily TODO</b></span>
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
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <TodoList />
      </v-container>
    </v-content>

    <v-bottom-navigation v-model="bottomNav" shift>
        <v-btn><span>ToDo</span><v-icon>mdi-newspaper-variant-multiple</v-icon></v-btn>
        <v-btn><span>Bookmark</span><v-icon>mdi-book-open-variant</v-icon></v-btn>
    </v-bottom-navigation>
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
