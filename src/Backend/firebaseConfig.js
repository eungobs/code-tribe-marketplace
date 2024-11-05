import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // Import getDatabase

const firebaseConfig = {
  apiKey: "AIzaSyAIfMbFvGO0OdT1kAj-QYKF5NuDkPmvaG8",
  authDomain: "easybuy-21989.firebaseapp.com",
  databaseURL: "https://easybuy-21989-default-rtdb.firebaseio.com", // Realtime Database URL
  projectId: "easybuy-21989",
  storageBucket: "easybuy-21989.appspot.com",
  messagingSenderId: "804945564869",
  appId: "1:804945564869:web:ae320a779bfda520d58cac",
  measurementId: "G-2QQGZMF605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);        // Firestore instance
const auth = getAuth(app);           // Authentication instance
const storage = getStorage(app);     // Storage instance
const realtimeDb = getDatabase(app); // Realtime Database instance

export { db, auth, storage, realtimeDb }; // Export all instances
