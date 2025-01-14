import {Maybe} from 'graphql/jsutils/Maybe';

export function dbFormatDate(date: Date|string): string {
  if (typeof date === 'string'){
    date = new Date(date);
  }
  const m = date.getMonth() + 1;
  const d = date.getDate(); // + 1;
  const formattedDate = `${date.getFullYear()}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`;
  return formattedDate;
}
export function dbFormatMaybeDate(date: Maybe<Date>): Maybe<string> {
  if (date == null) {
    return null;
  } else {
    return dbFormatDate(date);
  }
}

export function dbFormatDateTimeMidnight(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate(); // + 1;
  const formattedDate = `${date.getFullYear()}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d} 00:00`;
  return formattedDate;
}

export function dbFormatDateTime(date: Date): string {
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const h = date.getHours().toString().padStart(2, '0');
  const i = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d} ${h}:${i}:${s}`;
}
