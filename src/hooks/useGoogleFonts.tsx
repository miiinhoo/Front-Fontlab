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

  // 필터 적용
  const filteredFonts = fonts
    .filter((f) =>
      f.family.toLowerCase().includes(search.toLowerCase())
    )
    .filter((f) => category === "all" || f.category === category);

  return {
    loading,
    fonts: filteredFonts,
    search,
    setSearch,
    category,
    setCategory,
  };
}