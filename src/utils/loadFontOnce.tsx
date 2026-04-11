// 구글 폰트 URL 생성 공통 유틸
export const getGoogleFontUrl = (family: string, weight: number = 400, italic: boolean = false) => {
  if (!family) return "";
  
  const fam = family.replace(/ /g, "+");
  // 기본값
  const axis = italic ? `ital,wght@1,${weight}` : weight !== 400 ? `wght@${weight}` : "";
  
  return `https://fonts.googleapis.com/css2?family=${fam}${axis ? ":" + axis : ""}&display=swap`;
};

// 폰트 로드 유틸
export const loadFontOnce = (family: string, weight: number = 400, italic: boolean = false) => {
  if (!family) return;

  const url = getGoogleFontUrl(family, weight, italic);
  const id = `font-${family.replace(/ /g, "-")}-${weight}-${italic ? "italic" : "normal"}`;

  // 중복 로드 방지
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = url;

  document.head.appendChild(link);
};
