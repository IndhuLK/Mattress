// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// (Optional) Analytics — only if you're running in the browser
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXieY-_JwrCFo5DV7fWyFpFNfwEql_7jY",
  authDomain: "mattress-31654.firebaseapp.com",
  projectId: "mattress-31654",
  storageBucket: "mattress-31654.firebasestorage.app", // 🔧 FIXED (.app → .appspot.com)
  messagingSenderId: "978938654809",
  appId: "1:978938654809:web:ba7b3773e2954d93c34148",
  measurementId: "G-WK016PKFQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Export Firestore & Storage so you can use them anywhere
export const db = getFirestore(app);
export const storage = getStorage(app);
