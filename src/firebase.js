import firebase from "firebase/app";

import "firebase/auth";

const app = firebase.intializeApp({
  apiKey: process.env.MINIBEATS_FIREBASE_API_KEY,
  authDomain: process.env.MINIBEATS_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.MINIBEATS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.MINIBEATS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.MINIBEATS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.MINIBEATS_FIREBASE_APP_ID,
  measurementId: process.env.MINIBEATS_FIREBASE_MEASUREMENT_ID,
});

export const auth = app.auth();
export default app;
