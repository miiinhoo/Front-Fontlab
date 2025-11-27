const loaded = new Set();

export const loadFontOnce = (family: string, weights = ["400"]) => {
  if (loaded.has(family)) return;
  loaded.add(family);

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+"
  )}:wght@${weights.join(";")}&display=swap`;

  document.head.appendChild(link);
};