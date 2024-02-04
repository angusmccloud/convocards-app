export const nth = (num) => {
  const n = num % 100;
  return num + (n >= 11 && n <= 13 ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][num % 10]);
}

export const oxfordComma = (arr, conjunction, ifempty) => {
  const l = arr.length;
  if (!l) return ifempty;
  if (l < 2) return arr[0];
  if (l < 3) return arr.join(` ${conjunction} `);
  arr = arr.slice();
  arr[l - 1] = `${conjunction} ${arr[l - 1]}`;
  return arr.join(", ");
}

const objectsEqual = (o1, o2) => {
  return typeof o1 === 'object' && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length
    && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
    : o1 === o2;
}

export const arraysEqual = (a1, a2) => {
   return a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
}