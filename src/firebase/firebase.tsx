// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx7hexjm95ybzegsLVIWY-OcE4qYouic8",
  authDomain: "fontlab-9aa9f.firebaseapp.com",
  projectId: "fontlab-9aa9f",
  storageBucket: "fontlab-9aa9f.firebasestorage.app",
  messagingSenderId: "690256084688",
  appId: "1:690256084688:web:37b41cea3cbe59f944e8d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
