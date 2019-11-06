<template>
  <v-row>
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
