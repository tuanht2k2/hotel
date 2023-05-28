import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const handleCreateUser = async (email, password) => {
  const user = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return errorCode;
    });

  return user;
};

export const handleSignIn = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return errorCode;
    });

  return user;
};

export const handleSignOut = () => {
  return signOut(auth);
};
