import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCvMcae6NymZEpi4Se3n_ViUFAVoOL_598",
  authDomain: "snapchat-2b5f2.firebaseapp.com",
  projectId: "snapchat-2b5f2",
  storageBucket: "snapchat-2b5f2.appspot.com",
  messagingSenderId: "363414514249",
  appId: "1:363414514249:web:e659122765fe08dd6b2d98",
  measurementId: "G-5SMYV2CH9K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);