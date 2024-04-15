import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState } from 'react';

export const useAuth = () => {

	const [user, setUser] = useState()

  auth.onAuthStateChanged((user) => {
    if (user) setUser(user);
    return null;
  });
  
  return user
};
