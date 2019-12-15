<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>체중 데이터</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical class="fill-height">
      <v-tab>
        <v-icon left>mdi-table</v-icon>
      </v-tab>
      <v-tab>
        <v-icon left>mdi-chart-line</v-icon>
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-data-table
              class="elevation-1" 
              :headers="tableHeaders" 
              :items="healthDataList">              
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>그래프</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
// import _ from 'lodash'

export default {
  name: "HealthDataVisualizer",
  props: {
    healthDataList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tableHeaders: [
        { text: "일자", value: "registDate", align: 'center' },
        { text: "오전 체중 (kg)", value: "am", align: 'center' },
        { text: "오후 체중 (kg)", value: "pm", align: 'center' }
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