import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtHjKnjw-aVHQahkxMe_UubVMQWkzzX58",
  authDomain: "coolabs-a93cf.firebaseapp.com",
  projectId: "coolabs-a93cf",
  storageBucket: "coolabs-a93cf.firebasestorage.app",
  messagingSenderId: "867780443061",
  appId: "1:867780443061:web:4bdc37c4f2dfc20fc037fc",
  measurementId: "G-LX6E75563V"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };