export function pickProperties<T extends object, U extends(keyof T)[]>(o: T, ...keys: U): Pick<T, U[number]> {
  return Object.fromEntries(Object.entries(o).filter(([key]) => keys.includes(key as keyof T))) as Pick<T, U[number]>;
}
