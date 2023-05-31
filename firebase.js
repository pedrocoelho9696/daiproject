import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore, collection} from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration object goes here
  apiKey: "AIzaSyD2IjBIpJ5P42Wlj019I4MOOT7hL6BqVVM",
  authDomain: "projetodai-73129.firebaseapp.com",
  projectId: "projetodai-73129",
  storageBucket: "projetodai-73129.appspot.com",
  messagingSenderId: "567881372928",
  appId: "1:567881372928:web:482112f08dc25814428fe5",
  measurementId: "G-4B95SDGKKE"
};

const app = initializeApp(firebaseConfig, 'my-app');
export const auth = getAuth(app);
const firestore = getFirestore(app);
export const db = getFirestore(app);

export const usersRef = collection(db, 'users')
export const eventosRef= collection(db, 'eventos')
export const relatoriosRef= collection(db, 'relatorios')


