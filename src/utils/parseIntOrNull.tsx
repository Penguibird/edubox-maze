

export const parseIntOrNull = (s: string | null | undefined): number | null => {
    if (!s) {
        return null;
    }
    return parseInt(s, 10);
};
