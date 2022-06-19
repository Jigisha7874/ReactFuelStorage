 import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAjwNk7puG7ZWvJK4Uq9sXdR1W6W-6tMIs",
  authDomain: "authanticationreact.firebaseapp.com",
  projectId: "authanticationreact",
  storageBucket: "authanticationreact.appspot.com",
  messagingSenderId: "771776303729",
  appId: "1:771776303729:web:2e7c6370ec63603cbe41d0",
  measurementId: "G-1PNE8HWT5Q"
};


const firebaseDB = firebase.initializeApp(firebaseConfig);

const db = firebaseDB.database().ref();
const auth = firebase.auth();

export { db, auth };