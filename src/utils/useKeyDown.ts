import { useEffect } from 'react';

export const useKeyDown = (callback: (key: string) => void, keys: string[], deps: any[] = []) => {
    const onKeyDown = (event: KeyboardEvent) => {
        console.log('keydown pressed', event);
        const wasAnyKeyPressed = keys.some((key) => event.key === key);
        if (wasAnyKeyPressed) {
            event.preventDefault();
            event.stopPropagation();
            callback(event.key);
        }
    };

    useEffect(() => {
        // Z nejakeho duvodu se keydown zacne volat az po druhem kliku
        // Docasne reseni je simulovat keypress
        // @ts-ignore
        document.dispatchEvent(new KeyboardEvent('keydown', {key: ''}));

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, deps);
};
