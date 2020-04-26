<template>
  <app-base app-name="TODO App">
    <todo-input />
    <todo-summary :todoSummary="todoSummary" />
    <todo-list :todoList="todoList" :progressPercentage="progressPercentage" />
  </app-base>
</template>

<script>
import { TodoInput, TodoList, TodoSummary } from '@/components/todoapp'

import TodoService from "@/modules/service/todo";

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
      todoSummary: null,
    };
  },
  computed: {
    progressPercentage() {
      let total = this.todoList.length;
      let remaining = this.todoList.filter(e => e.status !== TodoService.StatusConstants.STATUS_DONE).length;
      return (total - remaining) / total * 100
    }
  },
  created() {
    TodoService.EventBus.$on("addNewTodo", todo => this.addTodo(todo));
    TodoService.EventBus.$on("deleteTodo", todoId => this.deleteTodo(todoId));
    TodoService.EventBus.$on("summaryInfoUpdate", statusChanges =>
      this.updateSummary(statusChanges)
    );
    TodoService.EventBus.$on("sort", sort => this.sortTodoList(sort));

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
      TodoService.getTodos()
        .then(todos => {
          this.todoList = this.$lds.map(todos.docs, doc =>
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
      TodoService.getSummary()
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
      TodoService.addTodo(todoItemData)
        .then(docRef => {
          todoItemData["id"] = docRef.id;
          this.todoList.push(todoItemData);
          this.todoSummary.statusCounts[
            TodoService.StatusConstants.STATUS_TODO
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
      TodoService.deleteTodo(todoId)
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
      this.todoList = this.$lds.orderBy(this.todoList, sort.keys, sort.directions);
    }
  }
};
</script>