import { db } from "../firebase/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

/**
 * 즐겨찾기 여부 확인
 */
export const isFavorite = async (userId: string, family: string) => {
  const ref = doc(db, "favoriteFonts", `${userId}_${family}`);
  const snap = await getDoc(ref);
  return snap.exists();
};

/**
 * 즐겨찾기 추가
 */
export const addFavorite = async (userId: string, family: string) => {
  const ref = doc(db, "favoriteFonts", `${userId}_${family}`);
  await setDoc(ref, {
    userId,
    family,
    createdAt: Date.now(),
  });
};

/**
 * 즐겨찾기 제거
 */
export const removeFavorite = async (userId: string, family: string) => {
  const ref = doc(db, "favoriteFonts", `${userId}_${family}`);
  await deleteDoc(ref);
};
