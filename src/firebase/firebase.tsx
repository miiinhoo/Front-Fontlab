
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCx7hexjm95ybzegsLVIWY-OcE4qYouic8",
  authDomain: "fontlab-9aa9f.firebaseapp.com",
  projectId: "fontlab-9aa9f",
  storageBucket: "fontlab-9aa9f.firebasestorage.app",
  messagingSenderId: "690256084688",
  appId: "1:690256084688:web:37b41cea3cbe59f944e8d5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
