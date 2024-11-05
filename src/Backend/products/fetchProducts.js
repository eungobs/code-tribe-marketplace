import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};
