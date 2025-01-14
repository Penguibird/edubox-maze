export const containsDuplicates = <T>(a: T[]): boolean => {
  const x = new Set(a);
  return x.size != a.length;
};
