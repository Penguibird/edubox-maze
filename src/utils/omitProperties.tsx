export function omitProperties<T extends object, U extends(keyof T)[]>(o: T, ...keys: U): Omit<T, U[number]> {
  return Object.fromEntries(Object.entries(o).filter(([key]) => !keys.includes(key as keyof T))) as Omit<T, U[number]>;
}
