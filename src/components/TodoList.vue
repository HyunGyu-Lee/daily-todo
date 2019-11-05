<template>
  <v-container>
    <!-- Todo Input Control  -->
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="6">
        <v-text-field type="text" 
                      v-model="todoContent" 
                      @keyup.enter="addTodoAction"
                      label="What is your TODO?">
        </v-text-field>
      </v-col>
    </v-row>

    <!-- TodoList  --> 
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="6">
        <v-list>
          <v-list-item v-for="todo in todoList" :key="todo.id">
            <v-list-item-content>
              <v-list-item-subtitle>
                {{todo.id }} / {{todo.data().content}} / {{todo.data().createAt}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Todo from '@/modules/biz/todo'

export default {
  name: 'TodoList',
  data() {
    return {
      todoContent: '',
      todoList: [
          { id: 'DUMMU-001', data: () => ({ content: 'Dummy Todo 1', createAt: Date.now() }) },
          { id: 'DUMMU-002', data: () => ({ content: 'Dummy Todo 2', createAt: Date.now() }) },
          { id: 'DUMMU-003', data: () => ({ content: 'Dummy Todo 3', createAt: Date.now() }) },
          { id: 'DUMMU-004', data: () => ({ content: 'Dummy Todo 4', createAt: Date.now() }) },
          { id: 'DUMMU-005', data: () => ({ content: 'Dummy Todo 5', createAt: Date.now() }) }
      ],
      treeItems: [
         { name: 'A' }, { name: 'B' }
      ]
    }
  },
  created() {
    // this.getAllTodos();
  },
  methods: {
    addTodoAction: function () {
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
