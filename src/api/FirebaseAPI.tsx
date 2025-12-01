import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login = async (email: string, pw: string) => {
  return await signInWithEmailAndPassword(auth, email, pw);
};

export const logout = async () => {
  return await signOut(auth);
};

export const signup = async (email: string, pw: string, username: string) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, pw);
  const uid = userCred.user.uid;

  // Firestore에 유저 정보 저장
  await setDoc(doc(db, "users", uid), {
    uid,
    email,
    username,
    createdAt: Date.now(),
  });

  return userCred;
};