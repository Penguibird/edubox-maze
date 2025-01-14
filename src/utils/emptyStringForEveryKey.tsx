export const emptyStringForEveryKey = new Proxy({}, {
  get: (target, key, receiver) => {
    if (typeof key == 'symbol')
      return '';
    if (key == 'months' || key.includes('months'))
      return emptyStringForEveryKey;
    return '';
  },
}) as Record<string, string | string[]>;
