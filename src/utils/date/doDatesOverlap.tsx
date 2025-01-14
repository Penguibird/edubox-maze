import {RuleDateType} from '../../types/Rule';
import DateUtils from '../../../helpers/DateUtils';

type DateRange = { dateStart: RuleDateType; dateEnd: RuleDateType; };
const dateify = (d: RuleDateType): number => {
  if (d instanceof Date) {
    return d.getTime();
  } else {
    return DateUtils.gqlDateTimeToDate(d).getTime();
  }
};
const dateifyRange = (d: DateRange): { dateStart: number; dateEnd: number; } => ({
  dateStart: dateify(d.dateStart),
  dateEnd: dateify(d.dateEnd)
});
export function doDatesOverlap(left: DateRange, right: DateRange): boolean {
  const l = dateifyRange(left);
  const r = dateifyRange(right);

  // L -- R --L --R
  if (l.dateStart <= r.dateStart && r.dateStart <= l.dateEnd) {
    return true;
  }
  // R -- L -- R -- L
  if (r.dateStart <= l.dateStart && l.dateStart <= r.dateEnd) {
    return true;
  }

  // L -- R-R --L
  if (l.dateStart <= r.dateStart && r.dateEnd <= l.dateEnd) {
    return true;
  }
  // R -- L-L --R
  if (r.dateStart <= l.dateStart && l.dateEnd <= r.dateEnd) {
    return true;
  }
  return false;
}
