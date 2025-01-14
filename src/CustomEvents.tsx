import React from 'react';

// if (import.meta.env.PROD) {
//     Sentry.init({
//         dsn: 'https://e15537e07c524669911f46ac0ff71541@o1295159.ingest.sentry.io/6520282',
//         integrations: [new BrowserTracing()],
//
//         // Set tracesSampleRate to 1.0 to capture 100%
//         // of transactions for performance monitoring.
//         // We recommend adjusting this value in production
//         tracesSampleRate: 1.0,
//     });
// }

export type LineAnchorData = { 
    anchorId: number
    el: HTMLElement
}
export interface CustomEventMap {
    addLineAnchor: CustomEvent<LineAnchorData>
    scrollUpdate: CustomEvent<null>
    mazeMove: CustomEvent<number>
}

export const addCustomEventListener = <T extends keyof CustomEventMap>(event: T, listener: (e: CustomEventMap[T]) => void, options?: AddEventListenerOptions) => {
    document.addEventListener(event, listener as any, options);
};

export const useCustomEvent = <T extends keyof CustomEventMap>(event: T, listener: (e: CustomEventMap[T]) => void, options?: AddEventListenerOptions) => {
    React.useEffect(() => {
        document.addEventListener(event, listener as any, options);
        return () => document.removeEventListener(event, listener as any, options);
    }, [event, listener, options]);
};


export const dispatchCustomEvent = <T extends keyof CustomEventMap>(type: T, detail: CustomEventMap[T]['detail']) => {
    document.dispatchEvent(new CustomEvent(type, { detail }));
};