import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { addFavorite, isFavorite, removeFavorite } from "../api/favoriteAPI";

type FavoriteContextType = {
    favorite : string[];
    toggleFavorite : (fontFamily:string) => Promise<void>;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export default function FavoriteProvider({ children }:{ children: React.ReactNode }){
    // 즐겨찾기 배열
    const [ favorite , setFavorite ] = useState<string[]>([]);

    useEffect(() => {
        // 비로그인 상태 => 즐겨찾기 불러오기 거부
        if(!auth.currentUser) return;
        isFavorite(auth.currentUser.uid).then(setFavorite);
    },[auth.currentUser]);

    const toggleFavorite = async(fontFamily:string) => {
        // 위와 동일
        if(!auth.currentUser) return;

        // 즐겨찾기에 해당 fontFamily가 존재하면 삭제, 존재하지않으면 추가.(explore페이지에 활용 예정)
        if(favorite.includes(fontFamily)){  
            await removeFavorite(auth.currentUser.uid, fontFamily);
            setFavorite(prev => prev.filter(font => font !== fontFamily));
        } else{
            await addFavorite(auth.currentUser.uid, fontFamily);
            setFavorite(prev => [...prev, fontFamily]);
        }
    };

    return (
        <FavoriteContext.Provider value={{ favorite, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    const ctx = useContext(FavoriteContext);
    if (!ctx) throw new Error("useFavorite는 FavoriteProvider안에서 사용해야함.");
    return ctx;
}