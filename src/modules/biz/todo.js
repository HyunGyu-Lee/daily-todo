import firebaseApp from '@/modules/firebase'

const firestore = firebaseApp.firestore();

const TODO_COLLECTION = 'todos'

const STATUS_TODO = 0
const STATUS_IN_PROGRESS = 1
const STATUS_DONE = 2

const StatusConstants = {
  STATUS_TODO,
  STATUS_IN_PROGRESS,
  STATUS_DONE,
  statusColors: {
    [STATUS_TODO]: {main: '#43B82E', sub: 'light-green'}, 
    [STATUS_IN_PROGRESS]: {main: '#388FFF', sub: 'light-blue'}, 
    [STATUS_DONE]: {main: '#BDBDBD', sub: 'grey'}
  },
  statusTexts: {
    [STATUS_TODO]: 'To Do', 
    [STATUS_IN_PROGRESS]: 'In progress', 
    [STATUS_DONE]: 'Done'
  }    
}

export default {
    StatusConstants,
    getCollection() {
        return firestore.collection(TODO_COLLECTION)
    },
    addTodo : function (todo) {
        return this.getCollection().add(todo);
    },
    getTodos: function () {
        return this.getCollection().get();
    }
}
