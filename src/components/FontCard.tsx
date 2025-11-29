import { useEffect } from "react";
import { loadFontOnce } from "../utils/loadFontOnce";

type Props = {
    font: any,
    temp: string,
}

export default function FontCard({ font,temp }:Props) {
  useEffect(() => {
    loadFontOnce(font.family, ["400"]);
  }, [font.family]);
  return (
    <div className="font-card">
      <div className="font-title">
        {font.family}
      </div>

      <div style={{ fontFamily: font.family }}
      className="fonts">
        {temp}
      </div>
    </div>
  )
}
