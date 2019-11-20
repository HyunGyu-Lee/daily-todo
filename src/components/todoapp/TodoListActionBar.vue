<template>
  <v-row dense align="center">
    <v-col class="text-right">
      <span class="caption mr-2" @click.stop.prevent="applySort('toFinishAt')">
        <span>목표일</span>
        <v-icon x-small>{{sortToFinishAtIcon}}</v-icon>
      </span>
      <span class="caption mr-2" @click.stop.prevent="applySort('status')">
        상태
        <v-icon x-small>{{sortStatusIcon}}</v-icon>
      </span>
      <span class="caption" @click.stop.prevent="applySort('createAt')">
        등록일
        <v-icon x-small>{{sortCreateAtIcon}}</v-icon>
      </span>
    </v-col>
  </v-row>
</template>

<script>
import TodoBiz from "@/modules/biz/todo";

const DIRECTION_NONE = 0
const DIRECTION_ASC = 1
const DIRECTION_DESC = 2

export default {
  data() {
    return {
      sort: {
        toFinishAt: 0,
        status: 0,
        createAt: 0
      },
      appliedSort: []
    };
  },
  computed: {
    sortToFinishAtIcon() {
      return this.resolveSortDirection(this.sort.toFinishAt);
    },
    sortStatusIcon() {
      return this.resolveSortDirection(this.sort.status);
    },
    sortCreateAtIcon() {
      return this.resolveSortDirection(this.sort.createAt);
    }
  },
  methods: {
    resolveSortDirection(value) {
      switch (value) {
        case DIRECTION_NONE:
          return "";
        case DIRECTION_ASC:
          return "mdi-arrow-up";
        case DIRECTION_DESC:
          return "mdi-arrow-down";
      }
    },
    applySort(key) {
      let direction = this.sort[key];
      this.sort[key] = direction === DIRECTION_DESC ? DIRECTION_NONE : direction + 1;
      // this.sort[key] = this.sort[key] === ASC ? DESC : ASC;
      TodoBiz.EventBus.$emit("sort", this.sort);
    }
  }
};
</script>

<style>
</style>