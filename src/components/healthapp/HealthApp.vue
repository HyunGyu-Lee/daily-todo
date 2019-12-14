<template>
  <v-container>
    <!-- <ul>
      <li>2019-12-02 start 84.3</li>
      <li>2019-12-02 end 84.5</li> 
      <li>2019-12-03 start 83.8</li>
      <li>2019-12-03 end 84.3</li>       
      <li>2019-12-04 start 83.8</li>
      <li>2019-12-04 end 84.4</li>
      <li>2019-12-05 start 84.4</li>
      <li>2019-12-05 end 84.4</li>
      <li>2019-12-06 start 84</li>
      <li>2019-12-06 end 84.4</li>      
      <li>2019-12-07 start 85</li>
      <li>2019-12-07 end 84.5</li>      
      <li>2019-12-08 start 84.5</li>
      <li>2019-12-08 end ?</li>            
    </ul>-->
    <HealthDataInput />
    <HealthDataVisualizer :health-data-list="healthDataList" />
  </v-container>
</template>

<script>
import _ from "lodash";
import HealthDataInput from '@/components/healthapp/HealthDataInput';
import HealthDataVisualizer from '@/components/healthapp/HealthDataVisualizer';

import HealthBiz from '@/modules/biz/health';

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
    HealthBiz.EventBus.$on("addNewHealthData", data => this.addHealthData(data));
    this.load();
  },
  methods: {
    load() {
      this.$app.startLoading();
      this.getHealthDatas();
    },
    getHealthDatas() {
      HealthBiz.getHealthDatas().then(data => {
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
      HealthBiz.addHealthData(data).then((e) => {
        if (e === 'create') {
          this.healthDataList.push(data);
        } else {
          let idx = _.findIndex(this.healthDataList, item => item.registDate == data['registDate'])          
          this.healthDataList[idx] = _.merge(this.healthDataList[idx], data);
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