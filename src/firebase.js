import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfmc1ku5xu2a2Y7r2WTcFgKSuDPudwCy0",
  authDomain: "whatsapp-clone-d0a0d.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-d0a0d.firebaseio.com",
  projectId: "whatsapp-clone-d0a0d",
  storageBucket: "whatsapp-clone-d0a0d.appspot.com",
  messagingSenderId: "788864411897",
  appId: "1:788864411897:web:703df3835348d16c649a28",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
