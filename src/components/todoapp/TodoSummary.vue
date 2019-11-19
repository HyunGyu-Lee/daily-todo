<template>
  <v-row dense align="center" class="pl-0 pr-0 ml-0 mr-0">
    <v-col class="text-right">
      <div class="status mr-3">
        <i class="todo-status-todo-stick" style="background"></i>
        <span class="caption mr-1">할 일</span>
        <span class="caption">0</span>
      </div>
      <div class="status mr-2">
        <i class="todo-status-in-progress-stick"></i>
        <span class="caption mr-1">진행 중</span>
        <span class="caption">0</span>        
      </div>
      <div class="status">
        <i class="todo-status-done-stick"></i>
        <span class="caption mr-1">완료</span>
        <span class="caption">0</span>
      </div>
    </v-col>
  </v-row>
</template>
<script>
// import TodoBiz from '@/modules/biz/todo'
export default {
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