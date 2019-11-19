<template>
  <v-container>
    <TodoInput />
    <TodoSummary />
    <TodoList :todoList="viewableTodoList" />
  </v-container>
</template>

<script>
import TodoSummary from '@/components/todoapp/TodoSummary'
import TodoList from '@/components/todoapp/TodoList'
import TodoInput from '@/components/todoapp/TodoInput'

import TodoBiz from '@/modules/biz/todo'

export default {
  name: 'TodoApp',
  components: {
    TodoInput,
    TodoSummary,
    TodoList
  },
  data() {
    return {                  
      todoList: [],
      todoSummary: null
    }
  },
  created() {
    TodoBiz.EventBus.$on('addNewTodo', todo => this.addTodo(todo))
    TodoBiz.EventBus.$on('deleteTodo', todoId => this.deleteTodo(todoId))

    this.loadInitialData();
  },
  computed: {
    viewableTodoList() {
      return this.todoList.map((todoEntity) => this.convertViewable(todoEntity))
    }
  },
  methods: {
    loadInitialData() {
      this.$app.startLoading(); 
      this.searchTodos();
      this.searchTodoSummary();
    },
    searchTodos() { 
      TodoBiz.getTodos().then(todos => {
        this.todoList = todos.docs;
      }).catch(error => {
        this.$app.finishLoading();
        this.$app.toast(error.message)
      });
    },
    searchTodoSummary() {
      TodoBiz.getSummary().then((summary) => {
        console.log(summary)
        this.$app.finishLoading();
      }).catch(error => {
        this.$app.finishLoading();
        this.$app.toast(error.message)
      })
    },
    addTodo(todoItemData) {
      TodoBiz.addTodo(todoItemData).then(docRef => {
        this.todoList.push({
          id: docRef.id, 
          data() {
            return todoItemData
          }
        })
      }).catch(error => {
        this.$app.toast(error.message)
        console.error(error)
      })
    },
    deleteTodo(todoId) {
      TodoBiz.deleteTodo(todoId).then(() => {
        let idx = this.todoList.findIndex(todo => todo.id === todoId);
        this.todoList.splice(idx, 1);
      }).catch(error => this.$app.toast(error.message))
    },
    convertViewable(todoEntity) {
      let entityBody = todoEntity.data();
      return {
        id: todoEntity.id, 
        content: entityBody.content,
        createAt: entityBody.createAt,
        status: entityBody.status,
        toFinishAt: entityBody.toFinishAt,
        starred: entityBody.starred
      }
    }
  }
}
</script>