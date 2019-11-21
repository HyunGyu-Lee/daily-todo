<template>
  <v-row dense align="center">
    <v-col class="text-right">
      <span class="caption mr-2" @click.stop.prevent="applySort('toFinishAt')">
        <span :class="toFinishAtDirection.code !== 0 ? 'font-weight-black': ''">목표일</span>
        <v-icon x-small>{{toFinishAtDirection.icon}}</v-icon>
      </span>
      <span class="caption mr-2" @click.stop.prevent="applySort('status')">
        <span :class="statusDirection.code !== 0 ? 'font-weight-black': ''">상태</span>
        <v-icon x-small>{{statusDirection.icon}}</v-icon>
      </span>
      <span class="caption" @click.stop.prevent="applySort('createAt')">
        <span :class="createAtDirection.code !== 0 ? 'font-weight-black': ''">등록일</span>
        <v-icon x-small>{{createAtDirection.icon}}</v-icon>
      </span>
    </v-col>
  </v-row>
</template>

<script>
import TodoBiz from "@/modules/biz/todo";

const DIRECTION_NONE = { code: 0, name: "none", icon: "" };
const DIRECTION_ASC = { code: 1, name: "asc", icon: "mdi-arrow-up" };
const DIRECTION_DESC = { code: 2, name: "desc", icon: "mdi-arrow-down" };

export default {
  data() {
    return {
      sort: {
        toFinishAt: 0,
        status: 0,
        createAt: 0
      },
      currentSortKeys: [],
      currentSortDirections: []
    };
  },
  computed: {
    toFinishAtDirection() {
      return this.resolveDirection(this.sort.toFinishAt);
    },
    statusDirection() {
      return this.resolveDirection(this.sort.status);
    },
    createAtDirection() {
      return this.resolveDirection(this.sort.createAt);
    }
  },
  methods: {
    resolveDirection(value) {
      switch (value) {
        case DIRECTION_NONE.code:
          return DIRECTION_NONE;
        case DIRECTION_ASC.code:
          return DIRECTION_ASC;
        case DIRECTION_DESC.code:
          return DIRECTION_DESC;
      }
    },
    applySort(key) {
      let direction = this.sort[key];
      let idx = this.currentSortKeys.findIndex(savedKey => key === savedKey);

      if (idx === -1) {
        this.sort[key] = direction + 1;
        this.currentSortKeys.push(key);
        this.currentSortDirections.push(this.sort[key]);
      } else {
        if (direction === DIRECTION_DESC.code) {
          this.sort[key] = DIRECTION_NONE.code;

          let idx = this.currentSortKeys.findIndex(
            savedKey => key === savedKey
          );
          this.currentSortKeys.splice(idx, 1);
          this.currentSortDirections.splice(idx, 1);
        } else {
          this.sort[key] = direction + 1;
          this.currentSortDirections[idx] = this.sort[key];          
        }
      }

      TodoBiz.EventBus.$emit("sort", {
        keys: this.currentSortKeys,
        directions: this.currentSortDirections.map(direction => this.resolveDirection(direction).name)
      });
    }
  }
};
</script>

<style>
</style>