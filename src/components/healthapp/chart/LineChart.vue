<script>
import {Line} from "vue-chartjs";

export default {
  extends: Line,
  props: {
    healthDataList: {
      type: Array,
      required: true
    }    
  },
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: [
        ],
        datasets: [
          {
            label: "일별 체중",
            backgroundColor: "#f87979",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            //Data to be represented on y-axis
            data: this.populateData(this.healthDataList)
          }
        ]
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 65,
                max: 90
              },
              gridLines: {
//                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
//                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  created() {    
    let maxDay = this.$moment().daysInMonth();
    for (let day = 1; day <= maxDay; day++) {
      this.datacollection.labels.push(day + '');
    }
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
  },
  methods: {
    populateData(healthDataList) {
      let maxDay = this.$moment().daysInMonth();
      let array = new Array(maxDay);
      for (let i in healthDataList) {
        let healthData = healthDataList[i];
        let avg = (healthData.am + healthData.pm) / 2;
        // console.log()
        array[this.$moment(healthData.registDate).date() - 1] = avg;
      }
      return array
    } 
  }
};
</script>