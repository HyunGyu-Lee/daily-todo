import Vue from 'vue'
import firebaseApp from '@/modules/firebase'
// import _ from 'lodash'

const firestore = firebaseApp.firestore();
const EventBus = new Vue()

const HEALTH_COLLECTION = 'health'

export default {
  EventBus,
  getCollection() {
    return firestore.collection(HEALTH_COLLECTION)
  },
  addHealthData(healthData) {
    return this.getCollection().add(healthData);
  },
  getHealthDatas() {
    return this.getCollection().get();
  },
  updateHealthData(id, payload) {
    return this.getCollection().doc(id).update(payload);
  }
}
