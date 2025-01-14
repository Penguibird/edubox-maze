

export const correctZipInput = (value: string) => {
    value = value.replace(/[^0-9\s]/g, '');
    value = value.replaceAll(' ', '');
    if (value.length >= 4) {
        value = value.substring(0, 3) + ' ' + value.substring(3)
    }
    return value.substring(0, 6);
}

export const correctDateInput = (value: string) => {
    let newValue = value;
    newValue = newValue.replaceAll(' ', '');


    if (newValue.length >= 8 && Number.isNaN(parseInt(newValue.charAt(newValue.length - 1), 10)) && newValue.charAt(newValue.length - 1) !== '.') {
        return newValue.slice(0, -1);
    }
    if (newValue.length > 10) {
        return newValue.slice(0, 10);
    }
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(newValue)) {
        return newValue;
    }
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(newValue.slice(0, -1))) {
        return newValue;
    }
    newValue = newValue.replaceAll('..', '.');
    if (newValue === '.') {
        return '';
    }
    let parts = newValue.split('.');
    if (parts.length === 0) {
        return newValue;
    }
    // if (parts[0]?.length === 2 && !parts[1]) {
    //     newValue += '.';
    // }
    // if (parts[1].length === 2 && !parts[2]) {
    //     newValue += '.';
    // }
    if (parts[0]?.length === 1 && parts[1] !== undefined) {
        newValue = '0' + newValue;
        parts = newValue.split('.');
    }
    if (parts[1]?.length === 1 && parts[2] !== undefined) {
        newValue = parts[0] + '.0' + parts[1] + '.';
        parts = newValue.split('.');
    }
    if (parts[0] && parts[1] === undefined) {
        if (parts[0].length === 2 && Number.isNaN(parseInt(newValue.charAt(newValue.length - 1), 10))) {
            newValue = '0' + newValue.slice(0, -1) + '.';
            parts = newValue.split('.');
        }
    }
    if (parts[1] && parts[2] === undefined) {
        if (parts[1].length === 2 && Number.isNaN(parseInt(newValue.charAt(newValue.length - 1), 10))) {
            newValue = newValue.slice(0, 3) + '0' + parts[1][0] + '.';
            parts = newValue.split('.');
        }
    }
    if (parts[0]?.length === 3) {
        newValue = newValue.slice(0, -1) + '.' + newValue.charAt(newValue.length - 1);
    }
    if (parts[1]?.length === 3) {
        newValue = newValue.slice(0, -1) + '.' + newValue.charAt(newValue.length - 1);
    }
    parts = newValue.split('.');
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === '') {
            continue;
        }
        if (!Number.isNaN(parseInt(part, 10))) {
            if (i === 0) {
                if (parseInt(part, 10) >= 4 && part.length === 1) {
                    return '0' + newValue + '.';
                }
                if ((parseInt(part, 10) < 0 || parseInt(part, 10) > 31)) {
                    return newValue.slice(0, -1);
                }
                if (parseInt(part, 10) === 0 && part.length === 2) {
                    return newValue.slice(0, -1);
                }
            }
            if (i === 1) {
                if (parseInt(part, 10) > 1 && part.length === 1) {
                    return newValue.slice(0, 3) + '0' + newValue.charAt(newValue.length - 1) + '.';
                }
                if ((parseInt(part, 10) < 0 || parseInt(part, 10) > 12)) {
                    return newValue.slice(0, -1);
                }
                if (parseInt(part, 10) === 0 && part.length === 2) {
                    return newValue.slice(0, -1);
                }
            }
        } else {
            return newValue.slice(0, -1);
        }
    }
    return newValue;
};

export const forceInputCursorEnd = (e: any) => {
    setTimeout(() => {
        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }
        const input = e.target as HTMLInputElement;
        input.setSelectionRange(input.value.length, input.value.length);
    });
}


/**
 * If one of provided
 * @param sources
 * @param searchValue
 */
export const normalizedSearch = (sources: string[], searchValue: string): boolean => {
    for (const source of sources) {
        if (source.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
            .includes(searchValue.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim())) {
            return true;
        }
    }
    return false;
};


export const getValueFromXML = (inputString:string, paramName: string) => {

    // Convert parameter name and XML tags to lowercase for case-insensitive matching
    const paramLower = paramName.toLowerCase();
    const regex = new RegExp("<" + paramLower + ">(.*?)<\/" + paramLower + ">", "is");
    const matches = regex.exec(inputString);

    if (matches && matches.length > 1) {
        const res = matches[1] ?? '';
        const doc = new DOMParser().parseFromString(res, 'text/html');
        return (doc.documentElement.textContent ?? '');
    } else {
        return null;
    }
};
