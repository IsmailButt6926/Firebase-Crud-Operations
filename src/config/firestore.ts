import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgL2AN4vuYKKCtpdEQpzInZacT5QkC3pg",
  authDomain: "person-database-e68cf.firebaseapp.com",
  projectId: "person-database-e68cf",
  storageBucket: "person-database-e68cf.appspot.com",
  messagingSenderId: "499577092330",
  appId: "1:499577092330:web:fc01e4dbabad42acb7bf93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
