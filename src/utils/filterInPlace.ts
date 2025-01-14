export function filterInPlace<T>(a: T[], condition: (t: T, i?: number, _a?: T[]) => boolean | any): T[] {
    let i = 0;
    let j = 0;

    while (i < a.length) {
        const val = a[i];
        if (condition(val, i, a)) {
            a[j++] = val;
        }
        i++;
    }

    a.length = j;
    return a;
}
