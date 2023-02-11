import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "next-event-demo-4821a.firebaseapp.com",
  databaseURL: process.env.FIREBASE_BASE_URI,
  projectId: "next-event-demo-4821a",
  storageBucket: "next-event-demo-4821a.appspot.com",
  messagingSenderId: "661162260025",
  appId: "1:661162260025:web:0cd39c1b9e60973377ffe8",
};

const app = initializeApp(firebaseConfig, "eventsApp");
const db = getDatabase(app);

export default db;
