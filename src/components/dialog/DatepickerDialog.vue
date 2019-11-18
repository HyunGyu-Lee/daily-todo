<template>
  <v-dialog
      v-model="show"
      persistent
      max-width="500px"
    >
      <v-card>
        <v-card-title>{{message}}</v-card-title>
        <v-card-text class="justify-center">
          <v-date-picker v-model="selectedDate" locale="ko" :full-width="true">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="emitCancel">Cancel</v-btn>
            <v-btn text color="primary" @click="emitOk">OK</v-btn>
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
    },
    initialDate: {
      type: String,
      required: false
    } 
  },
  data() {
    return {
      selectedDate: this.initialDate
    }
  },
  methods: {
    emitCancel() {
      this.$emit('cancel')
    },
    emitOk() {      
      this.$emit('ok', this.$moment(this.selectedDate + ' 23:59:59').valueOf())
    }
  }
}
</script>

<style>

</style>