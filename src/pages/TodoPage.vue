<template>
  <v-row>
    <TodoApp />
  </v-row>
</template>

<script>
import TodoApp from '@/components/todoapp/TodoApp';

export default {
  name: 'TodoPage',
  components: {
    TodoApp,
  }
};
</script>
