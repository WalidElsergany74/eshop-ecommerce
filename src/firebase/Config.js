// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FB_API_KEY,
  authDomain: "eshop-9e618.firebaseapp.com",
  databaseURL: "https://eshop-9e618-default-rtdb.firebaseio.com",
  projectId: "eshop-9e618",
  storageBucket: "eshop-9e618.appspot.com",
  messagingSenderId: "9520203383",
  appId: "1:9520203383:web:3f690dfea4299f01f9e872"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
 export const db = getFirestore(app)
 export const storage = getStorage(app)
 export const dataBase = getDatabase(app)

 export default app;