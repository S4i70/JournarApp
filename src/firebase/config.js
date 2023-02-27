// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCTsLFVXOMNEh69ZtAKNkMUGgd7ljWrBI",
  authDomain: "r3act-journal.firebaseapp.com",
  projectId: "r3act-journal",
  storageBucket: "r3act-journal.appspot.com",
  messagingSenderId: "871045658007",
  appId: "1:871045658007:web:ca77fe53aebf9fa205c0d2",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
