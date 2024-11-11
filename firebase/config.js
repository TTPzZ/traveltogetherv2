
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/analytics";


// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCsObo5ScqTGIfsUZpm27GjZf4-qmAu19E",
//   authDomain: "traveltogetherv2.firebaseapp.com",
//   projectId: "traveltogetherv2",
//   storageBucket: "traveltogetherv2.appspot.com", // Địa chỉ đúng cho storage bucket
//   messagingSenderId: "1072872060627",
//   appId: "1:1072872060627:web:0825654a56f89f323f8626",
//   measurementId: "G-R6EQ3W8ESM"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// const auth = firebase.auth();
// const db = firebase.firestore();

// auth.useEmulator('http://localhost:9099');
// if (window.location.hostname==='localhost'){
//   db.useEmulator('localhost','8085')
// }

// export {db, auth};
// export default firebase;

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCsObo5ScqTGIfsUZpm27GjZf4-qmAu19E",
  authDomain: "traveltogetherv2.firebaseapp.com",
  projectId: "traveltogetherv2",
  storageBucket: "traveltogetherv2.appspot.com", // Địa chỉ đúng cho storage bucket
  messagingSenderId: "1072872060627",
  appId: "1:1072872060627:web:0825654a56f89f323f8626",
  measurementId: "G-R6EQ3W8ESM"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// Chỉ sử dụng emulator khi chạy trên localhost
// if (window.location.hostname === 'localhost') {
//   auth.useEmulator('http://localhost:9099');
//   db.useEmulator('localhost', '8085');
// }

export { db, auth };
export default firebase;
