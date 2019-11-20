import Vue from 'vue'
import firebaseApp from '@/modules/firebase'
import _ from 'lodash'

const firestore = firebaseApp.firestore();
const EventBus = new Vue()

const TODO_COLLECTION = 'todos'

const STATUS_TODO = 0
const STATUS_IN_PROGRESS = 1
const STATUS_DONE = 2

const StatusConstants = {
  STATUS_TODO,
  STATUS_IN_PROGRESS,
  STATUS_DONE,
  statusMeta: {
    [STATUS_TODO]: { text: 'To Do', color: '#43B82E' },
    [STATUS_IN_PROGRESS]: { text: 'In progress', color: '#388FFF' },
    [STATUS_DONE]: { text: 'Done', color: '#BDBDBD' }
  }
}

export default {
  EventBus,
  StatusConstants,
  getCollection() {
    return firestore.collection(TODO_COLLECTION)
  },
  addTodo(todo) {
    return this.getCollection().add(todo);
  },
  getTodos() {
    return this.getCollection().orderBy('toFinishAt').get();
  },
  updateTodo(todoId, payload) {
    return this.getCollection().doc(todoId).update(payload);
  },
  deleteTodo(todoId) {
    return this.getCollection().doc(todoId).delete();
  },
  getSummary() {
    return this.getCollection().get().then((snapshot) => {
      let list = _.map(snapshot.docs, (doc) => doc.data());
      return {
        statusCounts: _.countBy(list, 'status')
      }
    })
  }
}
