import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAkp4H3JSseKx17-_DQhzN_rWaCIoyovJs",
  authDomain: "youtbe-cloe.firebaseapp.com",
  projectId: "youtbe-cloe",
  storageBucket: "youtbe-cloe.appspot.com",
  messagingSenderId: "967295303973",
  appId: "1:967295303973:web:6ab2c10eb2269182979acc",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
// export default db;
