<template>
  <v-container class="px-0">
    <p>오늘의 체중을 등록하세요!</p>
    <v-card-text class="pt-0">
      <v-row align="center" justify="space-between">
        <span @click="datepickerDialog = true">
          대상일:
          <u>{{targetDate}}</u>
        </span>
        <v-btn-toggle v-model="ampm" color="secondary accent-3" group>
          <v-btn value="am">오전</v-btn>
          <v-btn value="pm">오후</v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row justify="space-between">
        <v-col class="text-left">
          <span class="display-3 font-weight-light" v-text="weight"></span>
          <span class="subheading font-weight-light mr-1">kg</span>
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
    <v-dialog
      ref="datepickerRef"
      v-model="datepickerDialog"
      :return-value.sync="targetDate"
      persistent
      max-width="500px"
    >
      <v-date-picker v-model="targetDate" locale="ko" :full-width="true">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="datepickerDialog = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.datepickerRef.save(targetDate)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
  </v-container>
</template>

<script>
import HealthBiz from "@/modules/biz/health";

export default {
  name: "HealthDataInput",
  data() {
    return {
      weight: 80,
      registDate: Date.now(),
      ampm: "am",
      step: 0.1,
      targetDate: this.$moment().format("YYYY-MM-DD"),
      datepickerDialog: false
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
      let healthData = { registDate: this.targetDate, ampm: this.ampm, weight: this.weight };
      HealthBiz.EventBus.$emit("addNewHealthData", healthData);
    }
  }
};
</script>