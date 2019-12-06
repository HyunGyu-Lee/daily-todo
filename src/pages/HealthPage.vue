<template>
  <v-row align="start" class="fill-height">
    <HealthApp />
  </v-row>
</template>

<script>
import HealthApp from '@/components/healthapp/HealthApp'

export default {
  name: 'HealthPage',
  components: {
    HealthApp
  }
};
</script>
