<template>
  <v-row align="start" class="fill-height">
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
