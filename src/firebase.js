import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyANt17cIjUXa_gTowL--5zv4YksKmOIB4g",
  authDomain: "react-chat-app-ab7ec.firebaseapp.com",
  projectId: "react-chat-app-ab7ec",
  storageBucket: "react-chat-app-ab7ec.appspot.com",
  messagingSenderId: "386996121127",
  appId: "1:386996121127:web:16f0ee0411e1de57f3a802",
  measurementId: "G-MNSXV4YVGD",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
