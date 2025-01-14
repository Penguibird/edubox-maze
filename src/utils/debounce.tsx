// @ts-nocheck
export function debounce<T extends any[], U extends unknown>(func: (...args: T) => U, timeout = 300) {
  let timer: number;
  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((res) => {
      timer = setTimeout(() => {
        res(func.apply(this, args));
      }, timeout);
    });
  };
}
