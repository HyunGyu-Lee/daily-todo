<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>체중 데이터</v-toolbar-title>
    </v-toolbar>
    <v-tabs class="fill-height">
      <v-tab>
        <v-icon left>mdi-table</v-icon>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-chart-line</v-icon>
      </v-tab>
      <v-tab-item>
        <v-data-table
          :mobile-breakpoint="300"
          class="elevation-1"
          :headers="tableHeaders"
          :items="healthDataList"
        ></v-data-table>
      </v-tab-item>
      <v-tab-item>
        <LineChart :healthDataList="healthDataList"></LineChart>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
// import _ from 'lodash'
import LineChart from "./chart/LineChart";

export default {
  name: "HealthDataVisualizer",
  components: { LineChart },
  props: {
    healthDataList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tableHeaders: [
        { text: "일자", value: "registDate", align: "center" },
        { text: "오전 체중 (kg)", value: "am", align: "center" },
        { text: "오후 체중 (kg)", value: "pm", align: "center" }
      ]
    };
  },
  methods: {
    ampmText: function(ampm) {
      return ampm === "am" ? "오전" : "오후";
    }
  }
};
</script>

<style>
</style>