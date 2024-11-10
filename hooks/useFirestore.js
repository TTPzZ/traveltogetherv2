// import React,{useState} from "react";
// import { db } from "../firebase/config";
// import { collection } from "firebase/firestore";

// const useFirestore = (collection,condition)=>{
//     const [document,setDocuments]= useState([]);

//     React.useEffect(()=>{
//         let collectionRef =db.collection(collection).orderBy('createdAt');
//         if (condition){
//             if(!condition.compareValue || !condition.compareValue.length){
//                 return;
//             }

//             collectionRef = collectionRef.where(
//                 condition.fieldName,
//                 condition.operator,
//                 condition.compareValue
//             );
//         }

//         const unsubscibed= collectionRef.onSnapshot((snapshot)=>{
//             const documents = snapshot.docs.map((doc)=>({
//                 ...doc.data(),
//                 id: doc.id
//             }))
//             setDocuments(documents);
//         });
//     },[collection,condition]);
//     return document;
// };

// export default useFirestore;
import React, { useState } from 'react';
import { db } from '../firebase/config';

const useFirestore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy('createdAt');
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};

export default useFirestore;