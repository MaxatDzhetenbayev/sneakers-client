import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChaF0oNIGZiSwRzP6EkX7QGSd1_qBd8JA",
  authDomain: "sneakers-13b60.firebaseapp.com",
  projectId: "sneakers-13b60",
  storageBucket: "sneakers-13b60.appspot.com",
  messagingSenderId: "1082439401401",
  appId: "1:1082439401401:web:5f260ed43f6d0644ac8068",
  measurementId: "G-9ZRMX7CNV4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
