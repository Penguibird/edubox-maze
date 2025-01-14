import dateStringFormat from './dateStringFormat';
import { ONEDAY } from './MILISECONDS_IN_A_MINUTE';

export function isOverADayOld(date: string, time: string): boolean {
  const dateToCheck = new Date(dateStringFormat(date));
  const [h, m] = time.split(':').map((n) => parseInt(n, 10));
  dateToCheck.setHours(h);
  dateToCheck.setMinutes(m);
  dateToCheck.setSeconds(0);
  dateToCheck.setMilliseconds(0);
  const today = new Date();
  const dif = today.getTime() - dateToCheck.getTime();
  // //// console.log(date, time, res);
  return dif > ONEDAY;
}
