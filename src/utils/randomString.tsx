const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] as const;
let i = 0;
export const randomString = () => (i++)
  .toString()
  .split('')
  .map((n) => Number.parseInt(n, 10))
  .map((n) => alphabet[n])
  .join('');
