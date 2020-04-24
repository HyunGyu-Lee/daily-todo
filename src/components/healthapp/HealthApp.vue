<template>
  <v-container>
    <HealthDataInput />
    <HealthDataVisualizer :health-data-list="healthDataList" />
  </v-container>
</template>

<script>
import _ from "lodash";
import HealthDataInput from '@/components/healthapp/HealthDataInput';
import HealthDataVisualizer from '@/components/healthapp/HealthDataVisualizer';

import HealthService from '@/modules/service/health';

export default {
  name: "HealthApp",
  data() {
    return {
      healthDataList: []
    }
  },
  components: {
    HealthDataInput,
    HealthDataVisualizer
  },
  created() {
    HealthService.EventBus.$on("addNewHealthData", data => this.addHealthData(data));
    this.load();
  },
  methods: {
    load() {
      this.$app.startLoading();
      this.getHealthDatas();
    },
    getHealthDatas() {
      HealthService.getHealthDatas().then(data => {
        this.healthDataList = _.map(data.docs, row => this.convertFirebaseItem(row));
        this.$app.finishLoading();        
      }).catch(error => {
        this.$app.finishLoading();
        this.$app.toast(error.message);
      });
    },
    convertFirebaseItem(data) {
      var body = data.data();
      return {
        id: data.id,
        ...body
      }
    },
    addHealthData(data) {
      let payload = {registDate: data.registDate};
      payload[data.ampm] = data.weight
      HealthService.addHealthData(payload).then((e) => {
        if (e.mode === 'create') {
          this.healthDataList.push(payload);
        } else {
          let idx = _.findIndex(this.healthDataList, item => item.registDate == payload['registDate'])          
          this.$set(this.healthDataList[idx], data.ampm, data.weight);
        }
        this.$app.toast('체중 데이터가 변경되었습니다.');
      }).catch(error => {
        this.$app.toast(error.message);
        console.error(error);
      });
    }
  }
};
</script>