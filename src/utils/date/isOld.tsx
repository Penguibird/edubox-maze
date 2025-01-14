import dateStringFormat from './dateStringFormat';

/**
 * True if it is even a little bit old (dif > 0)
 * @param date dbFormatDate string
 * @param time timeslot hh:mm / h:mm / h:m
 * @returns True if it is even a little bit old (dif > 0)
 */
export function isOld(date: string, time: string, now = new Date()): boolean {
  const dateToCheck = new Date(dateStringFormat(date));
  const [h, m] = time.split(':').map((n) => parseInt(n, 10));
  dateToCheck.setHours(h);
  dateToCheck.setMinutes(m);
  dateToCheck.setSeconds(0);
  dateToCheck.setMilliseconds(0);
  const today = now;
  const dif = today.getTime() - dateToCheck.getTime();
  // //// console.log(date, time, res);
  return dif > 0;
}
