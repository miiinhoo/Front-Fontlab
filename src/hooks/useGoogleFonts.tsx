import { useEffect, useState } from "react";

export default function useGoogleFonts() {
  const API_KEY = import.meta.env.VITE_GOOGLE_FONT_KEY;

  const [fonts, setFonts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // api에서 받은 데이터를 json으로 변환하는 과정
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`
    )
      .then((r) => r.json())
      .then((data) => {
        setFonts(data.items);
        setLoading(false);
      });
  }, []);

  // 카테고리
  const filteredFonts = fonts
    .filter((f) =>
      f.family.toLowerCase().includes(search.toLowerCase())
    )
    .filter((f) => {
      if (category === "all") return true;
      if (category === "ko") {
        return Array.isArray(f.subsets) && f.subsets.includes("korean");
      }
      return f.category === category;
    });

  

  return {
    loading,
    fonts: filteredFonts,
    search,
    setSearch,
    category,
    setCategory,
    API_KEY
  };
}