<template>
  <app-base app-name="RandomDice Application">
    <app-row>
      <h3># 플레이 등록</h3>
    </app-row>
    <app-row>
      <h3># 플레이 기록</h3>
    </app-row>    
    <app-row>
      <v-data-table
        :mobile-breakpoint="300"
        :headers="playHistoryTable.headers"
        :items="playHistoryTable.histories"
      >
        <!-- <template v-slot:item.registDate="{ item }">
          {{ item.registDate + '장' }}
        </template> -->
        <template v-slot:item.gainedCard="{ item }">
          {{ calculateGainedCard(item.lastWave) + '장' }}
        </template>
        <template v-slot:item.gainedCardPerMin="{ item }">
          {{ calculateGainedCardPerMinutes(calculateGainedCard(item.lastWave), item.playMinutes) }}
        </template>        
      </v-data-table>
    </app-row>
  </app-base>
</template>

<script>
import RandomDiceService from '@/modules/service/randomdice'

export default {
  data() {
    return {
      playHistoryTable: {
        headers: [
          { text: '일자', value: 'registDate', align: 'center' },
          { text: '소요시간(분)', value: 'playMinutes', align: 'center' },
          { text: '최종 웨이브', value: 'lastWave', align: 'center' },
          { text: '획득 카드', value: 'gainedCard', align: 'center' },
          { text: '분당 획득카드', value: 'gainedCardPerMin', align: 'center' }
        ],
        histories: []
      }
    }
  },
  created() {
    this.load()
  },
  methods: {    
    calculateGainedCard: RandomDiceService.calculateGainedCard,
    calculateGainedCardPerMinutes: (card, min) => { 
      return Math.round((card / min) * 10000) / 10000
    },
    async load() {
      let data = await RandomDiceService.getPlayHistories();
      this.playHistoryTable.histories = data.docs
      console.log(data.docs)
    },
  }
}
</script>

<style>

</style>