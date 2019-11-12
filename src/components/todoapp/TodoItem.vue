<template>
  <v-col cols="12" sm="12" md="10" xs="12">
    <v-card rounded>
      <!-- TodoItem Header Control -->
      <v-card-subtitle :class="'pt-1 pb-1 pl-1 pr-1 ' + todoData.statusColor.sub" dark>
          <v-row dense align="center" class="pl-0 pr-0 ml-0 mr-0">
            <v-col class="text-left">
              <v-chip class="ml-0" dark label small :color="todoData.statusColor.main">{{todoData.statusText}}</v-chip>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="text-right" v-if="!isDone(todoData)">
              <v-tooltip top>
                <template v-slot:activator="{on}">
                  <v-chip class="mr-0" :color="remainingPeriodColor" small label>
                    <span class="caption" v-on="on" style="color: white;">
                      {{remainingPeriod}}
                    </span>
                  </v-chip>
                </template>
                <span>{{this.$moment(todoData.toFinishAt).format('YYYY-MM-DD')}}</span>
              </v-tooltip>
            </v-col>
          </v-row>
      </v-card-subtitle>
      <v-divider></v-divider>
      <!-- TodoItem Body -->
      <v-card-text class="grey lighten-5"> 
          <v-row dense align="center">
            <template v-if="editMode">
              <v-textarea label="Content of your todo" auto-grow outlined row="1" row-height="9" v-model="todoData.content"></v-textarea>
            </template>
            <template v-else>
              <v-col>
                <span class="body-2 font-weight-medium">{{todoData.content}}</span>
              </v-col>
            </template>
          </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <!-- TodoItem Action Control -->
      <v-card-actions class="grey lighten-5">
        <v-spacer></v-spacer>
        <v-btn v-if="editMode" icon x-small @click.stop.prevent="saveChanges">
          <v-icon color="#888888" dark>mdi-content-save</v-icon>
        </v-btn>
        <v-btn v-else icon x-small @click.stop.prevent="editMode = true">
          <v-icon color="#888888" dark>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="!this.editMode" icon x-small @click.stop.prevent="toggleStarred">
            <v-icon color="yellow darken-1">{{starredIcon}}</v-icon>
        </v-btn>              
        <v-btn v-if="!this.editMode" icon x-small @click.stop.prevent="deleteTodo">
            <v-icon color="#888888" dark>mdi-trash-can</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
</v-col>
</template>

<script>
import TodoBiz from '@/modules/biz/todo'

export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      todoData: this.todo,
      editMode: false
    }
  },
  computed: {
    remainingPeriod: function () {
      let prefix = this.isExceed() ? 'D + ' : 'D - '; 
      return prefix + this.$moment(this.todoData.toFinishAt).toNow(true)
    },
    remainingPeriodColor() {
      return this.isExceed() ? 'red' : 'primary'
    },
    starredIcon() {
      return this.todoData.starred ? 'mdi-star' : 'mdi-star-outline'
    }
  },
  methods: {
    isDone() {      
      return this.todoData.status == TodoBiz.StatusConstants.STATUS_DONE
    },
    isExceed() {
      return this.$moment(this.todoData.toFinishAt).diff(this.$moment(), 'seconds') < 0
    },
    deleteTodo() {
      TodoBiz.EventBus.$emit('deleteTodo', this.todoData.id);
    },
    toggleStarred() {
      TodoBiz.updateTodo(this.todoData.id, { starred: !this.todoData.starred })
      .then(() => {
        this.todoData.starred = !this.todoData.starred;
        if (this.todoData.starred) {
          this.$app.toast('Added to favorites')
        } else {
          this.$app.toast('Canceled to favorites')
        }
      }).catch(error => this.$app.toast(error.message))
    },
    saveChanges() {
      console.log('SAVE!!')
      this.editMode = false
      TodoBiz.updateTodo(this.todoData.id, {
        content: this.todoData.content
      }).then(() => {
        this.$app.toast('Todo is updated.')
        this.editMode = false
      }).catch(error => this.$app.toast(error.message));
    }
  }
}
</script>

<style>

</style>