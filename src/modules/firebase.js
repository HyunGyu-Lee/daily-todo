import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

var firebaseConfig = {
  apiKey: 'AIzaSyDzqN-wqvAsZ41HVCTzHYqqpQ_cX1sWzYs',
  authDomain: 'daily-todo-backend.firebaseapp.com',
  databaseURL: 'https://daily-todo-backend.firebaseio.com',
  projectId: 'daily-todo-backend',
  storageBucket: 'daily-todo-backend.appspot.com',
  messagingSenderId: '463694718444',
  appId: '1:463694718444:web:ad39110d9f515feb218cc9',
  measurementId: 'G-JXJD1PDEB6'  
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export default {
  app,
  collections: {
    TODO_APP: 'todos',
    HEALTH_APP: 'health',
    RANDOM_DICE_APP: 'randomdice'
  }
}
