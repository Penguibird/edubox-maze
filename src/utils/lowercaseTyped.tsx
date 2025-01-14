import { lowerCase } from 'lodash';

export const lowercaseTyped = <T extends string>(s: T): Lowercase<T> => lowerCase(s) as Lowercase<T>;
