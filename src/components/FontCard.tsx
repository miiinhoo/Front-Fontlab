import { useEffect, useState } from "react";
import { loadFontOnce } from "../utils/loadFontOnce";
import useCustomhook from "../hooks/useCustomhook";
import { auth } from "../firebase/firebase";
import ButtonComponent from "./common/ButtonComponent";
import { addFavorite, removeFavorite } from "../api/favoriteAPI";

type Props = {
    font: any,
    tempA: string,
    click:()=>void,
}

export default function FontCard({ font,tempA,click }:Props) {
  
  const { navigate, bool , setBool } = useCustomhook();

  useEffect(() => {
    loadFontOnce(font.family);
    //loadFontOnce(font.family, ["400"]);
  }, [font.family]);

  const [ fav, setFav ] = useState(false);
  const toggleFavorite = async () => {

    if(!auth.currentUser){
      const isConfirmed = window.confirm("로그인이 필요한 페이지입니다. 로그인 하시겠습니까?");
      if(!isConfirmed) return;
      navigate("/user/login")
    }
    
    if (fav) {
      await removeFavorite(auth.currentUser.uid, font.family);
      setFav(false);
    } else {
      await addFavorite(auth.currentUser.uid, font.family);
      setFav(true);
    }
    }
  return (
    <div className="font-cardwrap">
      <div className={"font-card" + (bool ? " active":"")} 
      onMouseEnter={() => setBool(true)}
      onMouseLeave={() => setBool(false)}
      onClick={() => {
        if(!auth.currentUser) return navigate("/user/login")
        click()
      }}
      >
        <div className="font-title">
        {font.family}
        </div>

        <div style={{ fontFamily: font.family }}
        className="fonts">
          {tempA || "FontLab"}
        </div>
      </div>
      <ButtonComponent
      text={fav ? "즐겨찾기 해제" : "즐겨찾기"}
      cln={"bookmark" + (fav ? " active" : "")}
      event={() => toggleFavorite()}
      />
    </div>
    
      
      
    
  )
}
