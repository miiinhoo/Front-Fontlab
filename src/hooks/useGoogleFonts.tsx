import { useEffect, useState } from "react";

export default function useGoogleFonts() {
  const API_KEY = import.meta.env.VITE_GOOGLE_FONT_KEY;

  const [fonts, setFonts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

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

  // 이름 검색 + 카테고리(일반/한글지원) 필터
  const filteredFonts = fonts
    // 1) 폰트 이름 검색
    .filter((f) =>
      f.family.toLowerCase().includes(search.toLowerCase())
    )
    // 2) 카테고리 필터
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