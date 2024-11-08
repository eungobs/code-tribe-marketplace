import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIfMbFvGO0OdT1kAj-QYKF5NuDkPmvaG8",
  authDomain: "easybuy-21989.firebaseapp.com",
  databaseURL: "https://easybuy-21989-default-rtdb.firebaseio.com",
  projectId: "easybuy-21989",
  storageBucket: "easybuy-21989.appspot.com",
  messagingSenderId: "804945564869",
  appId: "1:804945564869:web:ae320a779bfda520d58cac",
  measurementId: "G-2QQGZMF605"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const firestoreDb = getFirestore(app); // Firestore instance
const auth = getAuth(app); // Authentication instance
const storage = getStorage(app); // Storage instance
const db = getDatabase(app); // Realtime Database instance renamed back to `db`

// Export initialized instances
export { firestoreDb, auth, storage, db }; // Exporting all instances

