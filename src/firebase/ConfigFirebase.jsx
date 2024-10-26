import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDeyQZF1BjAKkhL39DWbstATgOWY7PlG88",
  authDomain: "astra-mocks.firebaseapp.com",
  projectId: "astra-mocks",
  storageBucket: "astra-mocks.appspot.com",
  messagingSenderId: "1090159619287",
  appId: "1:1090159619287:web:3d2eeefd1dce7ae6bad492"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB =getFirestore(app);
const auth =getAuth(app);

export {fireDB,auth};
