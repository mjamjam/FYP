// Import the functions you need from the SDKs you needi
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIDPFx1hDKA_l8DIVK6YmaNwyFrbJvPrY",
  authDomain: "fyp2middefense-f1750.firebaseapp.com",
  databaseURL: "https://fyp2middefense-f1750-default-rtdb.firebaseio.com/",
  projectId: "fyp2middefense-f1750",
  storageBucket: "fyp2middefense-f1750.appspot.com",
  messagingSenderId: "713989353367",
  appId: "1:713989353367:web:1a0763abb40789ee681ed2"
  
// apiKey: "AIzaSyD7962NqSIwDse7ADMRZrCs3oVBkrDfbcw",
// authDomain: "fypfinaldefenseapp.firebaseapp.com",
// databaseURL: "https://fypfinaldefenseapp-default-rtdb.firebaseio.com/",
// projectId: "fypfinaldefenseapp",
// storageBucket: "fypfinaldefenseapp.appspot.com",
// messagingSenderId: "235033725852",
// appId: "1:235033725852:web:1e2ebd2a6db0717d055659"
};


const firebaseDB = firebase.initializeApp(firebaseConfig);

const db = firebaseDB.database().ref();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export { auth, googleAuthProvider, facebookAuthProvider, db };
