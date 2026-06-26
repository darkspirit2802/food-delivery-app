// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "food-delivery-a9ab8.firebaseapp.com",
  projectId: "food-delivery-a9ab8",
  storageBucket: "food-delivery-a9ab8.firebasestorage.app",
  messagingSenderId: "587666594901",
  appId: "1:587666594901:web:2c08fb9c42ca8ff77348dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
