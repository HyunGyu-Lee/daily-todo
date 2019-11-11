<template>
  <v-container>
    <TodoInput />
    <TodoList :todoList="viewableTodoList" />
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import TodoList from '@/components/todoapp/TodoList'
import TodoInput from '@/components/todoapp/TodoInput'

import TodoBiz from '@/modules/biz/todo'

export default {
  name: 'TodoApp',
  components: {
    TodoInput,
    TodoList
  },
  data() {
    return {                  
      todoList: [],
      loading: false
    }
  },
  created() {
    TodoBiz.EventBus.$on('addNewTodo', todo => this.addTodo(todo))
    TodoBiz.EventBus.$on('deleteTodo', todoId => this.deleteTodo(todoId))

    this.getTodos();
  },
  computed: {
    viewableTodoList() {
      return this.todoList.map((todoEntity) => this.convertViewable(todoEntity))
    }
  },
  methods: {
    getTodos() {     
      this.loading = true; 
      TodoBiz.getTodos().then(todos => {
        this.todoList = todos.docs;
        this.loading = false
      }).catch(error => this.$app.showAlert({alertMessage: error.message}));
    },
    addTodo(todoItemData) {
      TodoBiz.addTodo(todoItemData).then(docRef => {
        this.todoList.push({
          id: docRef.id, 
          data() {
            return todoItemData
          }
        })
      }).catch(error => this.$app.showAlert({alertMessage: error.message}))
    },
    deleteTodo(todoId) {
      TodoBiz.deleteTodo(todoId).then(() => {
        let idx = this.todoList.findIndex(todo => todo.id === todoId);
        this.todoList.splice(idx, 1);
      }).catch(error => this.$app.showAlert({alertMessage: error.message}))
    },
    convertViewable(todoEntity) {
      let entityBody = todoEntity.data();
      return {
        id: todoEntity.id, 
        content: entityBody.content,
        createAt: entityBody.createAt,
        status: entityBody.status,
        statusColor: TodoBiz.StatusConstants.statusColors[entityBody.status],
        statusText: TodoBiz.StatusConstants.statusTexts[entityBody.status],
        toFinishAt: entityBody.toFinishAt
      }
    }
  }
}
</script>