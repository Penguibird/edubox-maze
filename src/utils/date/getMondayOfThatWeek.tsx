import { ONEDAY } from './MILISECONDS_IN_A_MINUTE';

export const getMondayOfThatWeek = (value: Date) => {
  let mondayOfThatWeek;
  if (value.getDay() == 0) {
    mondayOfThatWeek = new Date(value.getTime() - (ONEDAY * 6));
  } else {
    mondayOfThatWeek = new Date(value.getTime() - (ONEDAY * (value.getDay() - 1)));
  }
  return mondayOfThatWeek;
};
