import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXT4xTqLVZxH8wyzGxvPG-W1l8wvgKUac",
  authDomain: "ai-study-notes-de574.firebaseapp.com",
  projectId: "ai-study-notes-de574",
  storageBucket: "ai-study-notes-de574.firebasestorage.app",
  messagingSenderId: "528625983080",
  appId: "1:528625983080:web:8086b9e07aa5ad5e5325dd",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

