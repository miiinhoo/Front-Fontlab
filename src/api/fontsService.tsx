import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";

// 생성
export const createFont = async (data: any) => {
  const docRef = await addDoc(collection(db, "savedFonts"), {
    ...data,
    createdAt: Date.now(), //  정렬 기준
  });
  return { id: docRef.id };
};

// 최신순 정렬
export const getFonts = async () => {
  const q = query(
    collection(db, "savedFonts"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 단일 조회
export const getFont = async (id: string) => {
  const ref = doc(db, "savedFonts", id);
  const snap = await getDoc(ref);
  return { id, ...snap.data() };
};

// 업데이트
export const updateFont = async (id: string, data: any) => {
  const ref = doc(db, "savedFonts", id);
  await updateDoc(ref, data);
};

// 삭제
export const deleteFont = async (id: string) => {
  const ref = doc(db, "savedFonts", id);
  await deleteDoc(ref);
};
