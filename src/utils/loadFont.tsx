export const loadFont = (family: string, weights: string[]) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+"
  )}:wght@${weights.join(";")}&display=swap`;

  document.head.appendChild(link);
};
