<template>
  <v-row align="center" justify="center">
    <input type="text" v-model="todoContent">

    <button type="button" @click="addButtonClick">ADD</button>

    <ul>
      <li v-for="todo in todoList" :key="todo.id">
        {{ todo.id }} / {{todo.data().content}}
      </li>
    </ul>

  </v-row>
</template>

<script>
import Todo from '@/modules/biz/todo'

export default {
  name: 'TodoList',
  data() {
    return {
      todoContent: '',
      todoList: [
          { id: 'DUMMU-001', data: () => ({ content: 'Dummy Todo 1' }) },
          { id: 'DUMMU-002', data: () => ({ content: 'Dummy Todo 2' }) },
          { id: 'DUMMU-003', data: () => ({ content: 'Dummy Todo 3' }) },
          { id: 'DUMMU-004', data: () => ({ content: 'Dummy Todo 4' }) },
          { id: 'DUMMU-005', data: () => ({ content: 'Dummy Todo 5' }) }
      ]
    }
  },
  created() {
    // this.getAllTodos();
  },
  methods: {
    addButtonClick: function () {
      let todoItem = {
        content: this.todoContent, 
        complete: false, 
        createAt: Date.now(), 
        complateAt: null
      };

      var _this = this;

      Todo.addTodo(todoItem).then(function (docRef) {
        console.log(docRef.id)        
        _this.todoItem = '';
      }).catch(function (error) {
        console.error(error)
      })
    },
    getAllTodos: function () {
      var _this = this;
      Todo.getTodos().then(function (todos) {
        _this.todoList = todos.docs;
      }, function (error) {
        console.error(error)
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
