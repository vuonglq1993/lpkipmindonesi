// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlmcT-s68cZZqok7ZZzBsIbgP0vio-a1M",
  authDomain: "lpk-npm-indonesia.firebaseapp.com",
  projectId: "lpk-npm-indonesia",
  storageBucket: "lpk-npm-indonesia.firebasestorage.app",
  messagingSenderId: "161210688840",
  appId: "1:161210688840:web:fa1627c3ce5b55650a7f7d",
  measurementId: "G-WPM5XZFZSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export default app;