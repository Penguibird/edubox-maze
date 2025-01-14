// export const accentsMap = new Map([
//     ["a", "á|à|ã|â|ä"],
//     ["e", "é|è|ê|ë"],
//     ["i", "í|ì|î|ï"],
//     ["o", "ó|ò|ô|õ|ö"],
//     ["u", "ú|ù|û|ü"],
//     ["c", "ç"],
//     ["n", "ñ"]
// ]);

import { DateRange } from '../components_small/calendar/DateInput';

export function filterIsInDateRange(date: Date, range: DateRange): boolean {
    if (!range || !range[0] || !range[1]) {
        return true;
    }
    if (range[0] > range[1]) {
        range.reverse();
    }

    return date >= range[0] && date <= range[1];
}
