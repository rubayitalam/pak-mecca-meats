import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnNWoNNlb_SPQl1zVzGQEaCBbqfvVqHFU",
  authDomain: "pak-mecca-meats.firebaseapp.com",
  projectId: "pak-mecca-meats",
  storageBucket: "pak-mecca-meats.firebasestorage.app",
  messagingSenderId: "907376511697",
  appId: "1:907376511697:web:2bba92cb7e1e8c9ba113f0"
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
