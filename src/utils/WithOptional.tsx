export type WithOptional<T extends Record<string, unknown>, Keys extends (keyof T)> = Omit<T, Keys> & Partial<Pick<T, Keys>>;
