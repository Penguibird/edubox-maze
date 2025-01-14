function arrayify<T>(a: Record<any, T> | T[]): T[] {
  if (Array.isArray(a))
    return a;
  return Object.values(a);
}

export default arrayify;
