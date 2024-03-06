// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCcE-IGVeF90tPv4VLBgHt-JFj1SVbS3H0",
    authDomain: "notable-b0fb9.firebaseapp.com",
    projectId: "notable-b0fb9",
    storageBucket: "notable-b0fb9.appspot.com",
    messagingSenderId: "84176392009",
    appId: "1:84176392009:web:7157eb0c0a67a2054cd498",
    measurementId: "G-H6DH6CEFRG"
  };

export const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(firebase_app);
export const storage = getStorage(firebase_app);