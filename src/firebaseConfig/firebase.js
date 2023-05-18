import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXnrEFuUgWYYgRaRVreL43sixWFl4isxM",
  authDomain: "first-project-51f62.firebaseapp.com",
  databaseURL: "https://first-project-51f62-default-rtdb.firebaseio.com",
  projectId: "first-project-51f62",
  storageBucket: "first-project-51f62.appspot.com",
  messagingSenderId: "366265273372",
  appId: "1:366265273372:web:5b1f91f4911d3cde1c63d9",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

