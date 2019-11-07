<template>
  <v-container>
    <!-- Todo Input Control  -->
    <v-row justify="center">
      <v-col sm="1" md="10" xs="1">
        <v-text-field 
          type="text" 
          v-model="todoContent" 
          @keyup.enter="addTodoAction"
          append-icon="mdi-plus"
          @click:append="addTodoAction"
          label="What is your next plan?"
          >
        </v-text-field>
      </v-col>
    </v-row>

    <!-- TodoList  --> 
    <v-row justify="center">
      <v-col cols="12" sm="12" md="10" xs="12" v-for="todo in todoList" :key="todo.id">
        <v-card rounded>
          <v-card-subtitle :class="'pt-1 pb-1 ' + todo.statusColor.sub" dark>
            <v-row dense align="center">
              <v-col class="text-left"><v-chip class="ml-0" dark label small :color="todo.statusColor.main">{{todo.statusText}}</v-chip></v-col>
              <v-spacer></v-spacer>
              <v-col class="text-right"><span class="caption" style="color: white;">{{todo.createAt}}</span></v-col>
            </v-row>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text class="grey lighten-5"> 
            <v-row dense align="center">
              <v-col>
                <span class="body-2 font-weight-medium">{{todo.content}}</span> <br>
                <span v-if="isDone(todo)" class="caption">완료: {{todo.doneAt}}</span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="grey lighten-5">
              <v-spacer></v-spacer>
              <v-btn icon x-small>
                <v-icon color="yellow darken-1">mdi-star</v-icon>
              </v-btn>
              <v-btn icon x-small>
                <v-icon color="yellow darken-1">mdi-star-outline</v-icon>
              </v-btn>              
              <v-btn icon x-small>
                <v-icon color="#888888" dark>mdi-trash-can</v-icon>
              </v-btn>
            </v-card-actions>
        </v-card>
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
      statusColors: {0: {main: '#43B82E', sub: 'light-green'}, 1: {main: '#388FFF', sub: 'light-blue'}, 2: {main: '#BDBDBD', sub: 'grey'}},      
      statusTexts: {0: 'To Do', 1: 'In progress', 2: 'Done'},            
      todoContent: '',
      sourceTodoList: [
        { id: 'DUMMU-001', data: () => ({ content: '산책하기', createAt: Date.now(), status: 0, doneAt: null }) },
        { id: 'DUMMU-002', data: () => ({ content: '"DDD Start!" 책 2장 읽기', createAt: Date.now(), status: 0, doneAt: null }) },
        { id: 'DUMMU-003', data: () => ({ content: '운동하기', createAt: Date.now(), status: 2, doneAt: Date.now() }) },
        { id: 'DUMMU-004', data: () => ({ content: '퇴근 후 공부하기', createAt: Date.now(), status: 1, doneAt: null }) },
        { id: 'DUMMU-005', data: () => ({ content: '메인 화면에 버튼 추가', createAt: Date.now(), status: 2, doneAt: Date.now() }) }
      ]
    }
  },
  created() {
    // this.getAllTodos();
  },
  computed: {
    todoList: function () {
      return this.sourceTodoList.map(e => ({
        id: e.id, 
        content: e.data().content,
        createAt: this.$moment(e.data().createAt).fromNow(),
        status: e.data().status,
        statusColor: this.statusColors[e.data().status],
        statusText: this.statusTexts[e.data().status],
        doneAt: this.$moment(e.data().doneAt).fromNow()
      }));
    }
  },
  methods: {
    addTodoAction: function () {
      let todoItem = {
        content: this.todoContent, 
        status: Todo.STATUS_TODO, 
        createAt: Date.now(), 
        doneAt: null
      };

//      var _this = this;
      console.log(todoItem)
      // Todo.addTodo(todoItem).then(function (docRef) {
      //   console.log(docRef.id)        
      //   _this.todoItem = '';
      // }).catch(function (error) {
      //   console.error(error)
      // })
    },
    getAllTodos: function () {
      var _this = this;
      Todo.getTodos().then(function (todos) {
        _this.sourceTodoList = todos.docs;
      }, function (error) {
        console.error(error)
      });
    },
    isDone: function (todo) {
      return todo.status === Todo.STATUS_DONE
    }
  }
}
</script>