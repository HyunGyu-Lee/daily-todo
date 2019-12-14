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
    let collection = this.getCollection();
    
    return new Promise((resolve, reject) => {
      collection.where('registDate', '==', healthData['registDate']).get()
      .then((e) => {
        if (e.docs.length) {
          collection.doc(e.docs[0].id).update(healthData)
          resolve({mode: 'update'})
        } else {
          collection.add(healthData)
          resolve({mode: 'create'})          
        }
      }).catch(e => reject(e))
    });
  },
  getHealthDatas() {
    return this.getCollection().get();
  },
  updateHealthData(id, payload) {
    return this.getCollection().doc(id).update(payload);
  }
}
