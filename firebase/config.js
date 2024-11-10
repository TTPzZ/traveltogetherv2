// import firebase from "firebase/compat/app";

// import 'firebase/analytics';
// import'firebase/auth';
// import'firebase/firestore';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCsObo5ScqTGIfsUZpm27GjZf4-qmAu19E",
//   authDomain: "traveltogetherv2.firebaseapp.com",
//   projectId: "traveltogetherv2",
//   storageBucket: "traveltogetherv2.firebasestorage.app",
//   messagingSenderId: "1072872060627",
//   appId: "1:1072872060627:web:0825654a56f89f323f8626",
//   measurementId: "G-R6EQ3W8ESM"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth= firebase.auth();
// const db =firebase.firestore();

// export {db, auth};

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsObo5ScqTGIfsUZpm27GjZf4-qmAu19E",
  authDomain: "traveltogetherv2.firebaseapp.com",
  projectId: "traveltogetherv2",
  storageBucket: "traveltogetherv2.appspot.com", // Địa chỉ đúng cho storage bucket
  messagingSenderId: "1072872060627",
  appId: "1:1072872060627:web:0825654a56f89f323f8626",
  measurementId: "G-R6EQ3W8ESM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname==='localhost'){
  db.useEmulator('localhost','8085')
}

export {db, auth};
export default firebase;