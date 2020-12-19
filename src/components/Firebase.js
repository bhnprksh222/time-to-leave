import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDP15lPoU1iBEScovxt4ik8sAm51RLvWIo",
    authDomain: "time-to-leave-9e789.firebaseapp.com",
    projectId: "time-to-leave-9e789",
    storageBucket: "time-to-leave-9e789.appspot.com",
    messagingSenderId: "175626697715",
    appId: "1:175626697715:web:a45a4012ee214fa514b086",
    measurementId: "G-QF5VS2P9SY"
  };
  // Initialize Firebase
  
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = app.database();