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
        >
          <template v-slot:item.dailyChange="{ item }">
            <v-chip :color="getColor(item.dailyChange)" dark>{{ item.dailyChange }}</v-chip>
          </template>
        </v-data-table>
      </v-tab-item>
      <v-tab-item>
        <LineChart :healthDataList="visualHealthDataList"></LineChart>
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
        { text: "오후 체중 (kg)", value: "pm", align: "center" },
        { text: "일일 평균 (kg)", value: "avg", align: "center"},
        { text: "일일 변동 (kg)", value: "dailyChange", align: "center"}
      ]
    };
  },
  computed: {
    visualHealthDataList () {
      return this.healthDataList.map(item => {
        item.avg = Math.round(((item.am + item.pm) / 2) * 100) / 100
        item.dailyChange = Math.round((item.am - item.pm) * 100) / 100
      });
    }
  },
  methods: {
    ampmText: function(ampm) {
      return ampm === "am" ? "오전" : "오후";
    },
    getColor: function (value) {
      return value > 0 ? 'red' : 'green'
    }
  }
};
</script>

<style>
</style>