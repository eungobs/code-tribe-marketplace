import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const addProduct = async (productData) => {
  const productsRef = collection(db, 'products');
  await addDoc(productsRef, productData);
};
