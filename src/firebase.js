import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLiRSDdHyKmaDxt7bpe6CqZuFRCngF_a8",
  authDomain: "makit-steam.firebaseapp.com",
  projectId: "makit-steam",
  storageBucket: "makit-steam.firebasestorage.app",
  messagingSenderId: "955408006856",
  appId: "1:955408006856:web:178555cb205e1637596ffd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
