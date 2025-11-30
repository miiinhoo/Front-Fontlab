import { useEffect } from "react";
import { loadFontOnce } from "../utils/loadFontOnce";
import useCustomhook from "../hooks/useCustomhook";

type Props = {
    font: any,
    temp: string,
    click:()=>void,
}

export default function FontCard({ font,temp,click }:Props) {
  
  const { bool , setBool } = useCustomhook();

  useEffect(() => {
    loadFontOnce(font.family, ["400"]);
  }, [font.family]);

  return (
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
        {temp || "FontLab"}
      </div>
    </div>
  )
}
