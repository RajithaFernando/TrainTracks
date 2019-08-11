import firebase from '@firebase/app';
const config = {
    apiKey: "AIzaSyCSwn7hpWi9WlJoH74ZO-51McRJK5Q5YVY",
    authDomain: "two2-c1d8d.firebaseapp.com",
    databaseURL: "https://two2-c1d8d.firebaseio.com",
    projectId: "two2-c1d8d",
    storageBucket: "two2-c1d8d.appspot.com",
    messagingSenderId: "686345027787",
    appId: "1:686345027787:web:76a728043307d7f3"
  }

  const Fire = firebase.initializeApp(config);
  export default Fire;
