// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrQSA5qA0py7hCDx5KZVMn3VFIdU9f0wM",
  authDomain: "music-app-8c59a.firebaseapp.com",
  projectId: "music-app-8c59a",
  storageBucket: "music-app-8c59a.firebasestorage.app",
  messagingSenderId: "227426745499",
  appId: "1:227426745499:web:f079b24b4a8dac10845a3e",
  measurementId: "G-LW5VYN7NNL"
};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH= getAuth(FIREBASE_APP);
export const FIREBASE_FIRESTORE=getFirestore(FIREBASE_APP)
