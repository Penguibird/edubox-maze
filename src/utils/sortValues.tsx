import numbify from './numbify';

export const sortValues = ([keyA]: [string, any], [keyB]: [string, any]): number => numbify(keyA) - numbify(keyB);
