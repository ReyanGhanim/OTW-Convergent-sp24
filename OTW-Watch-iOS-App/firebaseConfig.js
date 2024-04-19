// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7ChVjIIrdywd0g4IXyGn_BltcJcm8cwU",
  authDomain: "on-the-watch-4cbe8.firebaseapp.com",
  projectId: "on-the-watch-4cbe8",
  storageBucket: "on-the-watch-4cbe8.appspot.com",
  messagingSenderId: "289350361106",
  appId: "1:289350361106:web:c1805eff124363886a78cb",
  measurementId: "G-K82BJWPHPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export {auth, db}