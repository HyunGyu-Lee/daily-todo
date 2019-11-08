<template>
  <v-col cols="12" sm="12" md="10" xs="12">
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
  methods: {
    isDone() {      
      return this.todo.status == TodoBiz.StatusConstants.STATUS_DONE
    }
  }
}
</script>

<style>

</style>