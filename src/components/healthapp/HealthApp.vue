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
    </ul>-->
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
    <!-- </v-card> -->
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
        <v-tab>
          <v-icon left>mdi-lead-pencil</v-icon>
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
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.</p>

              <p
                class="mb-0"
              >Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.</p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
// import _ from "lodash";

export default {
  name: "HealthApp",
  components: {},
  data() {
    return {
      weight: 80,
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
      console.log("Add!", this.weight);
    }
  }
};
</script>