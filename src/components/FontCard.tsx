import { useEffect } from "react";
import { loadFontOnce } from "../utils/loadFontOnce";
import useCustomhook from "../hooks/useCustomhook";

type Props = {
    font: any,
    tempA: string,
    click:()=>void,
}

export default function FontCard({ font,tempA,click }:Props) {
  
  const { bool , setBool } = useCustomhook();

  useEffect(() => {
    loadFontOnce(font.family);
  }, [font.family]);

  
  return (
    <div className="font-cardwrap">
      <div className={"font-card" + (bool ? " active":"")} 
      onMouseEnter={() => setBool(true)}
      onMouseLeave={() => setBool(false)}
      onClick={click}
      >
        <div className="font-title">
        {font.family}
        </div>

        <div style={{ fontFamily: font.family }}
        className="fonts">
          {tempA || "FontLab"}
        </div>
      </div>
     
    </div>
  )
}
