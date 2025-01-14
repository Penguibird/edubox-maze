/**
 * Turns the first letter uppercase, the rest lowercase
 */
export default <T extends string | null | undefined, >(s: T): T => (s == null
  ? null
  : [s.substring(0, 1).toUpperCase(), s.substring(1).toLowerCase()].join('') as string) as T;
