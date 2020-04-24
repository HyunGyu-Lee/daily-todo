<template>
  <app-row>
      <v-card>
        <v-progress-linear class="my-0" :value="progressPercentage"></v-progress-linear>
        <v-card-actions class="py-0">
          <TodoListActionBar></TodoListActionBar>
        </v-card-actions>
        <v-list class="pa-0">
          <template v-for="todo in todoList">
            <TodoItem :key="todo.id" :todo="todo"></TodoItem>
          </template>
        </v-list>
      </v-card>
  </app-row>
</template>

<script>
import { TodoItem, TodoListActionBar } from '@/components/todoapp'

export default {
  name: "TodoList",
  components: {
    TodoItem, TodoListActionBar
  },
  props: {
    todoList: {
      type: Array,
      required: true
    },
    progressPercentage: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style>
</style>