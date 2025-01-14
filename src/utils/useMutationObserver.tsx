import * as React from 'react';

export function useMutationObserver(target: HTMLElement | null, cb: MutationCallback) {
    React.useEffect(() => {
        if (!target) {
            return;
        }
        const m = new MutationObserver(cb);
        m.observe(target, { attributes: true, subtree: true, childList: true, });
        return () => m.disconnect();
    }, [cb, target]);
}
