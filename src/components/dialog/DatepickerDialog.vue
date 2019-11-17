<template>
  <v-dialog
      v-model="datepickerDialog"
      :return-value.sync="selectedDate"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title>{{message}}</v-card-title>
        <v-card-text class="justify-center">
          <v-date-picker v-model="selectedDate" locale="ko" :full-width="true">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="closeDialog">Cancel</v-btn>
            <v-btn text color="primary" @click="emitOnDateSelected">OK</v-btn>
          </v-date-picker>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    },
    message: {
      type: String,
      required: false,
      default: ''
    } 
  },
  data() {
    return {
      datepickerDialog: this.show,
      selectedDate: null
    }
  },
  methods: {
    closeDialog() {
      this.datepickerDialog = false;
    },
    emitOnDateSelected() {
      this.$emit('onDateSelect', this.selectedDate)
    }
  }
}
</script>

<style>

</style>