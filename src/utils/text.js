export const shortenText = (text, limit = 64) => {
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
};
