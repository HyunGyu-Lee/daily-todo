<template>
  <v-container>
    <p>오늘의 체중을 등록하세요!</p>
    <small>{{today}}</small>
    <v-card-text>
      <v-row class="mb-4" justify="space-between">
        <v-col class="text-left">
          <span class="display-3 font-weight-light" v-text="weight"></span>
          <span class="subheading font-weight-light mr-1">KG</span>
        </v-col>
        <v-col class="text-right">
          <v-btn :color="color" dark depressed fab @click="add">
            <v-icon large>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-slider
        v-model="weight"
        :step="step"
        :color="color"
        track-color="grey"
        always-dirty
        min="65"
        max="100"
      >
        <template v-slot:prepend>
          <v-icon :color="color" @click="decrement">mdi-minus</v-icon>
        </template>
        <template v-slot:append>
          <v-icon :color="color" @click="increment">mdi-plus</v-icon>
        </template>
      </v-slider>
    </v-card-text>
  </v-container>
</template>

<script>
import HealthBiz from '@/modules/biz/health'

export default {
  name: "HealthDataInput",
  data() {
    return {
      weight: 80,
      registDate: Date.now(),
      ampm: 'am',
      step: 0.1,
      today: this.$moment().format("YYYY-MM-DD")
    };
  },
  computed: {
    color() {
      if (this.weight < 70) return "indigo";
      if (this.weight <= 75) return "green";
      if (this.weight < 80) return "amber";
      if (this.weight <= 85) return "orange";
      if (this.weight <= 100) return "red";
      return "red";
    }
  },
  methods: {
    increment() {
      this.weight += this.step;
    },
    decrement() {
      this.weight -= this.step;
    },
    add() {
      let healthData = {
        registDate: this.registDate,
        ampm: this.ampm,
        weight: this.weight
      };
      HealthBiz.EventBus.$emit('addNewTodo', healthData)
    }
  }
};
</script>