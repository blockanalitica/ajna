export const sumArrayElements = (arrays) => {
  return arrays.reduce((a, b) => a.map((c, i) => c + b[i]));
};

export const filledUpArray = (array) => {
  let last;
  return array.map((element) => {
    if (element === null) {
      element = last;
    }
    last = element;
    return element;
  });
};
export const sortArray = (array, order) => {
  const direction = order.startsWith("-") ? "desc" : "asc";
  const field = order.replace("-", "");

  return [...array].sort((a, b) => {
    if (direction === "asc") {
      return Number(a[field]) > Number(b[field]) ? 1 : -1;
    } else {
      return Number(a[field]) < Number(b[field]) ? 1 : -1;
    }
  });
};
