<template>
  <v-container>
    <TodoInput />
    <TodoSummary :todoSummary="todoSummary" />
    <TodoList :todoList="todoList" />
  </v-container>
</template>

<script>
import TodoSummary from "@/components/todoapp/TodoSummary";
import TodoList from "@/components/todoapp/TodoList";
import TodoInput from "@/components/todoapp/TodoInput";

import TodoBiz from "@/modules/biz/todo";

import _ from "lodash";

export default {
  name: "TodoApp",
  components: {
    TodoInput,
    TodoSummary,
    TodoList
  },
  data() {
    return {
      todoList: [],
      todoSummary: null
    };
  },
  created() {
    TodoBiz.EventBus.$on("addNewTodo", todo => this.addTodo(todo));
    TodoBiz.EventBus.$on("deleteTodo", todoId => this.deleteTodo(todoId));
    TodoBiz.EventBus.$on("summaryInfoUpdate", statusChanges =>
      this.updateSummary(statusChanges)
    );
    TodoBiz.EventBus.$on("sort", sort => this.sortTodoList(sort));

    this.load();
  },
  methods: {
    /**
     * @description TodoApp을 위한 데이터 로딩 Facade 함수
     * 1. Todo목록 조회
     * 2. Todo요약 정보 조회
     */
    load() {
      this.$app.startLoading();
      this.searchTodos();
      this.searchTodoSummary();
    },
    /**
     * @description Todo 목록 조회
     */
    searchTodos() {
      TodoBiz.getTodos()
        .then(todos => {
          this.todoList = _.map(todos.docs, (doc) =>
            this.convertFirestoreTodoItem(doc)
          );
        })
        .catch(error => {
          console.error(error.message);
          this.$app.finishLoading();
          this.$app.toast(error.message);
        });
    },
    /**
     * @description Todo 요약 목록 조회
     */
    searchTodoSummary() {
      TodoBiz.getSummary()
        .then(summary => {
          this.todoSummary = summary;
          this.$app.finishLoading();
        })
        .catch(error => {
          this.$app.finishLoading();
          this.$app.toast(error.message);
        });
    },
    /**
     * @description Todo 추가
     * @param todoItemTem 추가할 Todo
     */
    addTodo(todoItemData) {
      TodoBiz.addTodo(todoItemData)
        .then(docRef => {
          todoItemData["id"] = docRef.id;
          this.todoList.push(todoItemData);
          this.todoSummary.statusCounts[
            TodoBiz.StatusConstants.STATUS_TODO
          ] += 1;
        })
        .catch(error => {
          this.$app.toast(error.message);
          console.error(error);
        });
    },
    /**
     * @description Todo 삭제
     * @todoId 삭제할 Todo의 id
     */
    deleteTodo(todoId) {
      TodoBiz.deleteTodo(todoId)
        .then(() => {
          let idx = this.todoList.findIndex(todo => todo.id === todoId);
          let status = this.todoList[idx].status;
          this.todoSummary.statusCounts[status] -= 1;
          this.todoList.splice(idx, 1);
        })
        .catch(error => this.$app.toast(error.message));
    },
    /**
     * @description firestore Todo(Document)를 TodoApp에서 사용하는 형태로 변환
     * @param doc Firestore Document
     */
    convertFirestoreTodoItem(doc) {
      let entityBody = doc.data();
      return {
        id: doc.id,
        content: entityBody.content,
        createAt: entityBody.createAt,
        status: entityBody.status,
        toFinishAt: entityBody.toFinishAt,
        starred: entityBody.starred
      };
    },
    /**
     * @description Todo 요약정보 업데이트
     * @param statusChanges Todo 상태 변경 정보
     */
    updateSummary(statusChanges) {
      this.todoSummary.statusCounts[statusChanges.oldStatus] -= 1;
      this.todoSummary.statusCounts[statusChanges.newStatus] += 1;
    },
    sortTodoList(sort) {
      console.log(sort)
      console.log(_.keys(sort))
      console.log(_.values(sort))      

      // this.todoList = _.orderBy(this.todoList, _.keys(sort), _.values(sort))
      this.todoList = _.orderBy(this.todoList, _.keys(sort), _.values(sort))
    }
  }
};
</script>