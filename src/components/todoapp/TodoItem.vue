<template>
  <v-col cols="12" sm="12" md="10" xs="12">
    <v-card rounded>
      <!-- TodoItem Header Control -->
      <v-card-subtitle :class="'pt-1 pb-1 ' + todo.statusColor.sub" dark>
          <v-row dense align="center">
            <v-col class="text-left"><v-chip class="ml-0" dark label small :color="todo.statusColor.main">{{todo.statusText}}</v-chip></v-col>
            <v-spacer></v-spacer>
            <v-col class="text-right" v-if="!isDone(todo)">
              <v-tooltip top>
                <template v-slot:activator="{on}">
                  <span class="caption" v-on="on" style="color: white;">
                    {{remainingPeriodDays}}
                  </span>
                </template>
                <span>{{this.$moment(todo.toFinishAt).format('YYYY-MM-DD')}}</span>
              </v-tooltip>
            </v-col>
          </v-row>
      </v-card-subtitle>
      <v-divider></v-divider>
      <!-- TodoItem Body -->
      <v-card-text class="grey lighten-5"> 
          <v-row dense align="center">
          <v-col>
              <span class="body-2 font-weight-medium">{{todo.content}}</span>
          </v-col>
          </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <!-- TodoItem Action Control -->
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
  computed: {
    remainingPeriodDays: function () {
      let periodDays = this.$moment(this.todo.toFinishAt).diff(Date.now(), 'days');
      if (periodDays >= 0) {
        return periodDays + '일 남음'
      }
      else {
        return (periodDays * -1) + '일 지남'
      }
    }
  },
  methods: {
    isDone() {      
      return this.todo.status == TodoBiz.StatusConstants.STATUS_DONE
    }
  }
}
</script>

<style>

</style>