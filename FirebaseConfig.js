// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2qEwQzigPf2BHO2nbR0T99EraavKqFQQ",
  authDomain: "jcet-companion-f.firebaseapp.com",
  projectId: "jcet-companion-f",
  storageBucket: "jcet-companion-f.appspot.com",
  messagingSenderId: "792842001666",
  appId: "1:792842001666:web:41bf784052373dbe4ef61b"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});