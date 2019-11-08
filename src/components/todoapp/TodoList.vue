<template>
  <v-row justify="center">
    <TodoItem :todo="todo" v-for="todo in computedTodoList" :key="todo.id" />
  </v-row>
</template>

<script>
import TodoItem from '@/components/todoapp/TodoItem'
import TodoBiz from '@/modules/biz/todo'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todoList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    computedTodoList: function () {
      return this.todoList.map(todoEntity => this.convertViewable(todoEntity));
    }
  },
  methods: {
    /**
     * convert TodoEntity (B/E format) to Viewable (F/E format)
     */
    convertViewable: function (todoEntity) {
      let entityBody = todoEntity.data();
      return {
        id: todoEntity.id, 
        content: entityBody.content,
        createAt: this.$moment(entityBody.createAt).fromNow(),
        status: entityBody.status,
        statusColor: TodoBiz.StatusConstants.statusColors[entityBody.status],
        statusText: TodoBiz.StatusConstants.statusTexts[entityBody.status],
        doneAt: this.$moment(entityBody.doneAt).fromNow()
      }
    }
  }
}
</script>

<style>

</style>