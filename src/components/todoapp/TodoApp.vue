<template>
  <v-container>
    <TodoInput @addNewTodo="addNewTodo" />
    <TodoList :todoList="todoList" />
  </v-container>
</template>

<script>
import TodoList from '@/components/todoapp/TodoList'
import TodoInput from '@/components/todoapp/TodoInput'
import Todo from '@/modules/biz/todo'

export default {
  name: 'TodoApp',
  components: {
    TodoInput,
    TodoList
  },
  data() {
    return {                  
      todoList: [
        { id: 'DUMMU-001', data: () => ({ content: '산책하기', createAt: Date.now(), status: 0, toFinishAt: Date.now() }) },
        { id: 'DUMMU-002', data: () => ({ content: '"DDD Start!" 책 2장 읽기', createAt: Date.now(), status: 0, toFinishAt: null }) },
        { id: 'DUMMU-003', data: () => ({ content: '운동하기', createAt: Date.now(), status: 2, toFinishAt: Date.now() }) },
        { id: 'DUMMU-004', data: () => ({ content: '퇴근 후 공부하기', createAt: Date.now(), status: 1, toFinishAt: null }) },
        { id: 'DUMMU-005', data: () => ({ content: '메인 화면에 버튼 추가', createAt: Date.now(), status: 2, toFinishAt: Date.now() }) }
      ]
    }
  },
  created() {
    // this.getAllTodos();
  },
  methods: {
    addNewTodo: function (todoItemData) {
      console.log(todoItemData)
    },
    addTodoAction: function () {
//      var _this = this;
      // Todo.addTodo(todoItem).then(function (docRef) {
      //   console.log(docRef.id)        
      //   _this.todoItem = '';
      // }).catch(function (error) {
      //   console.error(error)
      // })
    },
    getAllTodos: () => {
      Todo.getTodos().then(function (todos) {
        this.todoList = todos.docs;
      }, function (error) {
        console.error(error)
      });
    }
  }
}
</script>