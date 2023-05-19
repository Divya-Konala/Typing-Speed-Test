// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLTQ300hcYRZtwSHs-JG1TqkXeQFGANmM",
  authDomain: "typing-test-d7769.firebaseapp.com",
  projectId: "typing-test-d7769",
  storageBucket: "typing-test-d7769.appspot.com",
  messagingSenderId: "1038995048125",
  appId: "1:1038995048125:web:e310a0c8395f064b5619d4",
  measurementId: "G-ME8E8VNNV8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// we use these two objects throughout the application
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export {auth, db}


