import { auth, google } from './firebase';

export const authWithGoogle = () => auth.signInWithPopup(google);
export const signOut = () => auth.signOut();
