import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const updateProduct = async (id, updates) => {
  const productRef = doc(db, 'products', id);
  await updateDoc(productRef, updates);
};
