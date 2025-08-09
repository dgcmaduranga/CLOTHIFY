import { createContext, useContext, useEffect, useState } from "react";
import { auth, listenAuth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

const AuthCtx = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // wait for first auth state

  useEffect(() => {
    const unsub = listenAuth(u => { setUser(u); setLoading(false); });
    return unsub;
  }, []);

  const register = async ({name, email, password}) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    setUser({ ...cred.user });
    return cred.user;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const value = { user, loading, register, login, logout };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);