<template>
  <app-row>
    <v-text-field 
        type="text" 
        v-model="content" 
        @keyup.enter="addTodoFirstStep"
        append-icon="mdi-plus"
        @click:append="addTodoFirstStep"
        label="What needs to be done?"
      >
      </v-text-field>
      <v-dialog
      v-model="datepickerDialog"
      :return-value.sync="toFinishAt"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title>How many times do you have to do this?</v-card-title>
        <v-card-text class="justify-center">
          <v-date-picker v-model="toFinishAt" locale="ko" :full-width="true">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="datepickerDialog = false">Cancel</v-btn>
            <v-btn text color="primary" @click="addTodoSecondStep(toFinishAt)">OK</v-btn>
          </v-date-picker>
        </v-card-text>
      </v-card>
    </v-dialog>
  </app-row>
</template>

<script>
import TodoService from '@/modules/service/todo'

export default {
  name: 'TodoInput',
  data() {
    return { 
      content: '',
      toFinishAt: new Date().toISOString().substr(0, 10),
      datepickerDialog: false
    }
  },
  methods: {
    addTodoFirstStep: function () {
      if (!this.content) {
        this.$app.toast('Please insert todo')
      } else {
        this.datepickerDialog = true;
      }
    },
    addTodoSecondStep: function (toFinishAt) {
      let todoItemData = {
        content: this.content, 
        status: TodoService.StatusConstants.STATUS_TODO, 
        createAt: Date.now(),
        toFinishAt: this.$moment(toFinishAt + ' 23:59:59').valueOf(),
        starred: false
      }; 
      
      TodoService.EventBus.$emit('addNewTodo', todoItemData)
      
      this.content = ''
      this.datepickerDialog = false
      this.toFinishAt = new Date().toISOString().substr(0, 10)
    }
  }
}
</script>

<style>

</style>