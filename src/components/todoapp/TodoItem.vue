<template>
  <v-col cols="12" sm="12" md="10" xs="12">
    <v-card rounded>
      <!-- TodoItem Header Control -->
      <v-card-subtitle :class="'pt-1 pb-1 pl-1 pr-1 ' + todo.statusColor.sub" dark>
          <v-row dense align="center" class="pl-0 pr-0 ml-0 mr-0">
            <v-col class="text-left">
              <v-chip class="ml-0" dark label small :color="todo.statusColor.main">{{todo.statusText}}</v-chip>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="text-right" v-if="!isDone(todo)">
              <v-tooltip top>
                <template v-slot:activator="{on}">
                  <v-chip class="mr-0" :color="remainingPeriodColor" small label>
                    <span class="caption" v-on="on" style="color: white;">
                      {{remainingPeriod}}
                    </span>
                  </v-chip>
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
    remainingPeriod: function () {
      let prefix;
      
      if (this.isExceed() == false) {
        prefix = 'D-'
      } else {
        prefix = 'D+'
      }

      return prefix + this.$moment(this.todo.toFinishAt).toNow(true)
    },
    remainingPeriodColor() {
      return this.isExceed() ? 'red' : 'primary'
    }
  },
  methods: {
    isDone() {      
      return this.todo.status == TodoBiz.StatusConstants.STATUS_DONE
    },
    isExceed() {
      return this.$moment(this.todo.toFinishAt).diff(this.$moment(), 'seconds') < 0
    }
  }
}
</script>

<style>

</style>