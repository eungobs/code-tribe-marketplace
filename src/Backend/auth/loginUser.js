import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
