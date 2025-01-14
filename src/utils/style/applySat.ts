export function applySat(sat: number, hex: any) {
  const hash = hex.substring(0, 1) === '#';

  hex = (hash ? hex.substring(1) : hex).split('');

  const long = hex.length > 3;
  const rgb = [];
  let i = 0;
  const len = 3;

  rgb.push(hex.shift() + (long ? hex.shift() : ''));
  rgb.push(hex.shift() + (long ? hex.shift() : ''));
  rgb.push(hex.shift() + (long ? hex.shift() : ''));

  for (; i < len; i++) {
    if (!long)
      rgb[i] += rgb[i];

    // eslint-disable-next-line no-mixed-operators
    rgb[i] = Math.round(parseInt(rgb[i], 16) / 100 * sat).toString(16);

    rgb[i] += rgb[i].length === 1 ? rgb[i] : '';
  }

  return (hash ? '#' : '') + rgb.join('');
}
