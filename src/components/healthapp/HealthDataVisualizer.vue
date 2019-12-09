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
          <v-card-text>표</v-card-text>
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
export default {
  name: 'HealthDataVisualizer',
  props: {
    healthDataList: {
      type: Array,
      required: true
    }
  },
  created() {
    console.log(this.healthDataList)
  }
};
</script>

<style>
</style>