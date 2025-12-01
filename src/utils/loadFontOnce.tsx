export const loadFontOnce = (family: string, weight: number = 400, italic: boolean = false) => {
  if (!family) return;

  const fam = family.replace(/ /g, "+");

  const styleParam = italic ? "ital,wght@1," : "wght@";
  const weightParam = italic ? `${weight}` : `${weight}`;

  const url = `https://fonts.googleapis.com/css2?family=${fam}:${styleParam}${weightParam}&display=swap`;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;

  document.head.appendChild(link);
};
