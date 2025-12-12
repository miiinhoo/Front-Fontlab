import { useEffect } from "react";
import { loadFontOnce } from "../utils/loadFontOnce";
import useCustomhook from "../hooks/useCustomhook";
import { auth } from "../firebase/firebase";
import ButtonComponent from "./common/ButtonComponent";

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
      text={"즐겨찾기"}
      cln="bookmark"
      />
    </div>
    
      
      
    
  )
}
