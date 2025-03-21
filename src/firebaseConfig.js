import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLp-z8xyKG4grAIbZWq1bSDbwmfE82j9Q",
  authDomain: "laundrylink-268e6.firebaseapp.com",
  projectId: "laundrylink-268e6",
  storageBucket: "laundrylink-268e6.firebasestorage.app",
  messagingSenderId: "899998514064",
  appId: "1:899998514064:web:35f4810274884ecc785115",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
