<template>
  <v-row justify="center" v-if="todoList.length > 0">    
    <TodoItem :todo="todo" v-for="todo in todoList" :key="todo.id" />
  </v-row>
  <v-row justify="space-around" v-else>
    <v-subheader>Nothing to do!</v-subheader>
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