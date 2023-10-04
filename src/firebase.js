// Import the required modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyCNn3pn9-IowayN0gpSltRRD2cezLOgI",
  authDomain: "foopy-50f95.firebaseapp.com",
  projectId: "foopy-50f95",
  storageBucket: "foopy-50f95.appspot.com",
  messagingSenderId: "1023308216788",
  appId: "1:1023308216788:web:473a8b0877341614f6be41"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, db, signInWithEmailAndPassword };