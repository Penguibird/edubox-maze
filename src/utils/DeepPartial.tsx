export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: undefined | null | DeepPartial<T[P]>;
} : undefined | null | T;
