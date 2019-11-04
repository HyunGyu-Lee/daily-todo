import firebaseApp from '@/modules/firebase'

const firestore = firebaseApp.firestore();

const TODO_COLLECTION = 'todos'

export default {
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
