import * as admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';

export function setupFirebase() {
  initializeApp({
    apiKey: "AIzaSyAPx_QPl6kPaa7FEdlqimcyG0rdRW4xcho",
    authDomain: "to-do-nuxt-52872.firebaseapp.com",
    projectId: "to-do-nuxt-52872",
    storageBucket: "to-do-nuxt-52872.appspot.com",
    messagingSenderId: "141962744478",
    appId: "1:141962744478:web:35f0c9b8b6a3edd6d0e18f"
  });
  admin.initializeApp({
    credential:
      process.env.USE_DEFAULT_SERVICE_ACCOUNT === 'true'
        ? admin.credential.applicationDefault()
        : admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  });
}
