<template>
  <v-list-item class="px-0 mb-3">
    <v-card
      tile
      width="100%"
      elevation="0"
      outlined
      :style="'border-left: 5px solid ' + this.todoColor"
    >
      <v-card-subtitle class="pt-1 pb-1 pl-1 pr-1" dark>
        <v-row dense align="center" class="pl-0 pr-0 ml-0 mr-0">
          <v-col class="text-left">
            <template v-if="editMode">
              <v-chip-group v-model="todoData.status" mandatory active-class="statusSelected">
                <v-chip
                  :key="statusItem.status"
                  v-for="statusItem in statusItems"
                  :color="statusItem.color"
                  dark
                  label
                  small
                >{{statusItem.text}}</v-chip>
              </v-chip-group>
            </template>
            <template v-else>
              <v-chip class="ml-0" dark label small :color="this.todoColor">{{this.todoText}}</v-chip>
            </template>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-right" v-if="!isDone(todoData)">
            <template v-if="editMode">
              <v-icon>mdi-calendar</v-icon>
            </template>
            <template v-else>
              <v-tooltip top>
                <template v-slot:activator="{on}">
                  <v-chip class="mr-0" :color="remainingPeriodColor" small label>
                    <span class="caption" v-on="on" style="color: white;">{{remainingPeriod}}</span>
                  </v-chip>
                </template>
                <span>{{this.$moment(todoData.toFinishAt).format('YYYY-MM-DD')}}</span>
              </v-tooltip>
            </template>
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text style="height: 80px">
        <template v-if="editMode">
          <v-textarea v-model="todoData.content" class="px-0" ref="todoContentArea" rounded auto-grow >            
          </v-textarea>
        </template>
        <template v-else>
            <span class="body-2 font-weight-medium">{{todoData.content}}</span>
        </template>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <template v-if="editMode">
          <v-btn icon x-small @click.stop.prevent="changeViewModeAndSave">
            <v-icon color="#888888 darken-1" dark>mdi-check</v-icon>
          </v-btn>
          <v-btn icon x-small @click.stop.prevent="editMode = false">
            <v-icon color="#888888 darken-1" dark>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn icon x-small @click.stop.prevent="changeEditMode">
            <v-icon color="#888888 darken-1" dark>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon x-small @click.stop.prevent="toggleStarred">
            <v-icon color="yellow darken-1">{{starredIcon}}</v-icon>
          </v-btn>
          <v-btn icon x-small @click.stop.prevent="deleteTodo">
            <v-icon color="#888888 darken-1" dark>mdi-trash-can</v-icon>
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-list-item>
</template>

<script>
import TodoBiz from "@/modules/biz/todo";

export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      todoData: this.todo,
      editMode: false,
      statusItems: TodoBiz.StatusConstants.statusMeta
    };
  },
  computed: {
    todoText() {
      return this.getTodoStatusMeta(this.todoData.status).text;
    },
    todoColor() {
      return this.getTodoStatusMeta(this.todoData.status).color;
    },
    remainingPeriod() {
      let prefix = this.isExceed() ? "D + " : "D - ";
      return prefix + this.$moment(this.todoData.toFinishAt).toNow(true);
    },
    remainingPeriodColor() {
      return this.isExceed() ? "red" : "primary";
    },
    starredIcon() {
      return this.todoData.starred ? "mdi-star" : "mdi-star-outline";
    }
  },
  methods: {
    getTodoStatusMeta(status) {
      return TodoBiz.StatusConstants.statusMeta[status];
    },
    isDone() {
      return this.todoData.status == TodoBiz.StatusConstants.STATUS_DONE;
    },
    isExceed() {
      return (
        this.$moment(this.todoData.toFinishAt).diff(this.$moment(), "seconds") <
        0
      );
    },
    deleteTodo() {
      TodoBiz.EventBus.$emit("deleteTodo", this.todoData.id);
    },
    toggleStarred() {
      TodoBiz.updateTodo(this.todoData.id, {
        starred: !this.todoData.starred
      })
        .then(() => {
          this.todoData.starred = !this.todoData.starred;
          if (this.todoData.starred) {
            this.$app.toast("Added to favorites");
          } else {
            this.$app.toast("Canceled to favorites");
          }
        })
        .catch(error => this.$app.toast(error.message));
    },
    changeEditMode() {
      this.editMode = true
      
      // TODO setTimeout 쓰지 않고 해결방법 찾기
      setTimeout(() => {
        this.$refs.todoContentArea.focus();
      }, 10);
    },
    changeViewModeAndSave() {
      this.editMode = false;
      TodoBiz.updateTodo(this.todoData.id, {
        content: this.todoData.content,
        status: this.todoData.status
      })
        .then(() => {
          this.$app.toast("Todo is updated.");
          this.editMode = false;
        })
        .catch(error => this.$app.toast(error.message));
    }
  }
};
</script>

<style scoped>
.statusSelected {
  color: white !important;
  font-weight: bolder;
}
</style>