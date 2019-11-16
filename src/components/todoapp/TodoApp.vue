<template>
  <v-container>
    <TodoInput />
    <TodoList :todoList="viewableTodoList" />
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
      todoList: []
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
      this.$app.startLoading(); 
      TodoBiz.getTodos().then(todos => {
        this.todoList = todos.docs;
      this.$app.finishLoading();
      }).catch(error => this.$app.toast(error.message));
    },
    addTodo(todoItemData) {
      TodoBiz.addTodo(todoItemData).then(docRef => {
        this.todoList.push({
          id: docRef.id, 
          data() {
            return todoItemData
          }
        })
      }).catch(error => this.$app.toast(error.message))
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