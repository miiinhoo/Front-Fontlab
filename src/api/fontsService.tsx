import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// 컬렉션 참조
const col = collection(db, "savedFonts");


export const createFont = async (data: any) => {
  const docRef = await addDoc(col, data);
  return { id: docRef.id, ...data };
};

export const getFonts = async () => {
  const res = await getDocs(col);
  return res.docs.map((d) => ({ id: d.id, ...d.data() }));
};


export const getFont = async (id: any) => {
  const ref = doc(db, "savedFonts", id);
  const snapshot = await getDoc(ref);
  return { id, ...snapshot.data() };
};

export const updateFont = async (id: string, data: any) => {
  const ref = doc(db, "savedFonts", id);
  await updateDoc(ref, data);
};


export const deleteFont = async (id: string) => {
  const ref = doc(db, "savedFonts", id);
  await deleteDoc(ref);
};
