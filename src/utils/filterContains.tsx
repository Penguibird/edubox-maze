// export const accentsMap = new Map([
//     ["a", "á|à|ã|â|ä"],
//     ["e", "é|è|ê|ë"],
//     ["i", "í|ì|î|ï"],
//     ["o", "ó|ò|ô|õ|ö"],
//     ["u", "ú|ù|û|ü"],
//     ["c", "ç"],
//     ["n", "ñ"]
// ]);

import { searchNormalize } from "../../pokladna/CartView/AddItemModal/searchNormalize";

export function filterContains(phrase: string, ...values: string[]): boolean {
    phrase = searchNormalize(phrase);
    for (let i = 0; i < values.length; i++) {
        let value = values[i];
        if (!value) {
            continue;
        }
        value = searchNormalize(value);

        if (value.includes(phrase)) {
            return true;
        }
    }
    return false;
}
