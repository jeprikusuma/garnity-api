const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyAgnr9boqsLtoSvQB0-0D-ysC6Od1UXb-M",
    authDomain: "garnity-f41d2.firebaseapp.com",
    databaseURL: "https://garnity-f41d2-default-rtdb.firebaseio.com",
    projectId: "garnity-f41d2",
    storageBucket: "garnity-f41d2.appspot.com",
    messagingSenderId: "1097496006050",
    appId: "1:1097496006050:web:b6b5e10f51dc49187576fb",
    measurementId: "G-1EWHG38GDH"
};
  
const fire = firebase.initializeApp(firebaseConfig);
module.exports = fire;