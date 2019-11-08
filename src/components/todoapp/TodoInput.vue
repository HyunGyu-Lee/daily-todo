<template>
  <v-row justify="center">
    <v-col sm="10" md="10" xs="1">
      <v-text-field 
        type="text" 
        v-model="content" 
        @keyup.enter="addNewTodo"
        append-icon="mdi-plus"
        @click:append="addNewTodo"
        label="What is your next plan?"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import TodoBiz from '@/modules/biz/todo'

export default {
  name: 'TodoInput',
  data() {
    return { 
      content: ''
    }
  },
  methods: {
    addNewTodo: function () {
      let todoItemData = {
        content: this.content, 
        status: TodoBiz.STATUS_TODO, 
        createAt: Date.now(), 
        doneAt: null
      };
      this.$emit('addNewTodo', todoItemData);
      this.clearContent();
    },
    clearContent: function () {
      this.content = ''
    }
  }
}
</script>

<style>

</style>