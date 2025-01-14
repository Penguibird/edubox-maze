import { Rule } from '../types/Rule';
import style from './constants_style';

export default (t: Rule['ruleType']): string => {
  const c = [
    '#ffe7ae',
    '#68C5DB',
    '#e5b3ff',
    '#a7cfff',
    '#ffbadf',
    '#85eaad',
  ];
    // .map((hex) => applySat(70, hex))
    // .map((col) => lightenDarkenColor(col, 70));
  switch (t) {
    case 'age':
      return c[0];
    case 'datePeriod':
      return c[1];
    case 'membershipType':
      return c[2];
    case 'reciprocity':
      return c[3];
    case 'timeInterval':
      return c[4];
    case 'timeZone':
      return c[5];

    default:
      return style.gray[20];
  }
};
