import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyC1QH0ElTjfanSf6TULXA73YMhXiZTzwHo",
    authDomain: "e-commerce-jp.firebaseapp.com",
    projectId: "e-commerce-jp",
    storageBucket: "e-commerce-jp.firebasestorage.app",
    messagingSenderId: "331187890739",
    appId: "1:331187890739:web:5344cc9cf00d1646951146",
    measurementId: "G-FZSPY0X4C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, signInWithPopup, signOut, db };
