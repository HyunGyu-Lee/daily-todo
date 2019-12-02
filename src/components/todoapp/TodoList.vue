<template>
  <v-row justify="center">
    <v-col sm="10" md="10" xs="1">
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
    </v-col>
  </v-row>
</template>

<script>
import TodoListActionBar from '@/components/todoapp/TodoListActionBar'
import TodoItem from '@/components/todoapp/TodoItem';

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