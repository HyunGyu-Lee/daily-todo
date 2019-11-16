<template>
  <v-row justify="center">
    <v-col sm="10" md="10" xs="1">
      <v-card>
        <v-progress-linear class="my-0" v-model="progressPercentage"></v-progress-linear>
        <v-card-actions>
          <p>TodoList Summary Here!</p>
        </v-card-actions>
        <v-list class="pa-0">
          <template v-for="todo in todoList">
            <TodoItem :key="todo.id" :todo="todo"></TodoItem>
          </template>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TodoItem from "@/components/todoapp/TodoItem";

export default {
  name: "TodoList",
  components: {
    TodoItem
  },
  props: {
    todoList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      progressPercentage: 50
    };
  }
};
</script>

<style>
</style>