<template>
  <v-row justify="center">
    <TodoItem :todo="todo" v-for="todo in todoList" :key="todo.id" />
  </v-row>
</template>

<script>
import TodoItem from '@/components/todoapp/TodoItem'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todoList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>