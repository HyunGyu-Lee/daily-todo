<template>
  <app-row v-if="todoSummary" align="end">
    <div class="status mr-3">
      <i class="todo-status-todo-stick" style="background"></i>
      <span class="caption mr-1">할 일</span>
      <span class="caption">{{todoCount}}</span>
    </div>
    <div class="status mr-2">
      <i class="todo-status-in-progress-stick"></i>
      <span class="caption mr-1">진행 중</span>
      <span class="caption">{{inprogressCount}}</span>        
    </div>
    <div class="status">
      <i class="todo-status-done-stick"></i>
      <span class="caption mr-1">완료</span>
      <span class="caption">{{doneCount}}</span>
    </div>
  </app-row>
  <!-- <v-row dense align="center" justify="center" class="pl-0 pr-0 ml-0 mr-0" v-if="todoSummary">    
    <v-col class="text-right" sm="10" md="10" xs="1"> -->


</template>
<script>
export default {
  props: {
    todoSummary: {
      type: Object,
      default: null
    }
  },
  computed: {
    todoCount() {
      let v = this.todoSummary.statusCounts[0]
      return v ? v : 0
    },
    inprogressCount() {
      let v = this.todoSummary.statusCounts[1]
      return v ? v : 0
    },
    doneCount() {
      let v = this.todoSummary.statusCounts[2]
      return v ? v : 0
    }
  }
}
</script>

<style scoped>
.status {
  display: inline-block;
}

.todo-status-todo-stick {
  width: 7px;
  height: 14px;
  display: inline-block;
  background-color: #43b82e;
  margin-right: 5px
}
.todo-status-in-progress-stick {
  width: 7px;
  height: 14px;
  display: inline-block;
  background-color: #388fff;
  margin-right: 5px  
}
.todo-status-done-stick {
  width: 7px;
  height: 14px;
  display: inline-block;
  background-color: #bdbdbd;
  margin-right: 10px
}
</style>