import firebaseApp from '@/modules/firebase'

const firestore = firebaseApp.firestore();

const TODO_COLLECTION = 'todos'

const STATUS_TODO = 0
const STATUS_IN_PROGRESS = 1
const STATUS_DONE = 2
export default {
    STATUS_TODO,
    STATUS_IN_PROGRESS,
    STATUS_DONE,
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
