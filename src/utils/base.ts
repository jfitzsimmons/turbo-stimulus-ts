export const isSingle = (n1: number, n2: number) =>
  n1 < 10 || n2 < 10 ? true : false;

export const trailingZeros = (n: number) => {
  let zeros = "";
  for (let i = n; i--; ) {
    zeros += "0";
  }
  return zeros;
};

export const splitter = (whole: string, divider: number) => {
  const half1: number = parseInt(whole.substring(0, whole.length - divider));
  const half2: number = parseInt(whole.substring(whole.length - divider));
  const arr: [number, number] = [half1, half2];

  return arr;
};

export const getDigit = (num: number, divider: number) =>
  +(num + "").slice(divider);
