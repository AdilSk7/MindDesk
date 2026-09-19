import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE6MS1Omk4RGrUSGi58FPUQ532eAONe1Q",
  authDomain: "mind-desk-cb5e9.firebaseapp.com",
  projectId: "mind-desk-cb5e9",
  storageBucket: "mind-desk-cb5e9.firebasestorage.app",
  messagingSenderId: "766763593114",
  appId: "1:766763593114:web:9364cda1a3dca2b79cde23",
  measurementId: "G-4Z4HP1W30Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
