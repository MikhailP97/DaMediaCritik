// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQi6GQxiUHIYcltLdcgUHjAP20QJaJgzw",
  authDomain: "damoviecritik.firebaseapp.com",
  projectId: "damoviecritik",
  storageBucket: "damoviecritik.appspot.com",
  messagingSenderId: "1096713505584",
  appId: "1:1096713505584:web:97bd947b6144b53f18d6f5",
  measurementId: "G-YFP9TNXGQK",
  databaseURL: "https://damoviecritik-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app);
const db = getFirestore(app);

export {auth, database, db}