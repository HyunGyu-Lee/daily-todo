import Vue from 'vue'

const EventBus = new Vue()

export default {
  EventBus,
  showAlert(alertParams) {
    this.EventBus.$emit('showAlert', alertParams);
  }
}