import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDzqN-wqvAsZ41HVCTzHYqqpQ_cX1sWzYs",
  authDomain: "daily-todo-backend.firebaseapp.com",
  databaseURL: "https://daily-todo-backend.firebaseio.com",
  projectId: "daily-todo-backend",
  storageBucket: "daily-todo-backend.appspot.com",
  messagingSenderId: "463694718444",
  appId: "1:463694718444:web:ad39110d9f515feb218cc9",
  measurementId: "G-JXJD1PDEB6"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp
