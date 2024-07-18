import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyAXRJziAwJgk_lLb-XIIIdpm0hJ6lhj4ks",
  authDomain: "english-podcast-2132d.firebaseapp.com",
  projectId: "english-podcast-2132d",
  storageBucket: "english-podcast-2132d.appspot.com",
  messagingSenderId: "145026586065",
  appId: "1:145026586065:web:afd772b3fb91e20bf2fcf0",
  measurementId: "G-HQH3MMZ4NP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);