<template>
  <v-container>
    <TodoInput @addNewTodo="addNewTodo" />
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
     this.getAllTodos();
  },
  computed: {
    viewableTodoList: function () {
      return this.todoList.map((todoEntity) => this.convertViewable(todoEntity))
    }
  },
  methods: {
    addNewTodo: function (todoItemData) {
      var _this = this;
      TodoBiz.addTodo(todoItemData).then(function (docRef) {
        _this.todoList.push({
          id: docRef.id, data: function () {
            return todoItemData
          }}
        )        
      }).catch(function (error) {
        console.error(error)
      })
    },
    getAllTodos: function () {
      console.log(this.$moment())
      var _this = this;
      TodoBiz.getTodos().then(function (todos) {
        _this.todoList = todos.docs;
      }, function (error) {
        console.error(error)
      });
    },
    convertViewable: function (todoEntity) {
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