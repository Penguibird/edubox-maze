export const dateRangeWithOptionalYear = (code: string, dateStart: Date, dateEnd: Date) => {
  const ds = Intl.DateTimeFormat(code, { day: 'numeric', month: 'numeric', year: dateStart.getFullYear() == dateEnd.getFullYear() ? undefined : 'numeric' }).format(dateStart);
  const de = Intl.DateTimeFormat(code, { day: 'numeric', month: 'numeric', year: 'numeric' }).format(dateEnd);
  return `${ds} - ${de}`;
};
