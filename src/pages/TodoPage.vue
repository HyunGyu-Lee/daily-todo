<template>
  <v-row>
    <h1>Hello TODO</h1>
    <TodoList />
  </v-row>
</template>

<script>
import TodoList from '@/components/TodoList';

export default {
  name: 'TodoPage',
  components: {
    TodoList,
  }
};
</script>
