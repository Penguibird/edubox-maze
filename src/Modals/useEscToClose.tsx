import * as React from 'react';

export function useEscToClose(opened: boolean, onClose: () => void) {
  React.useEffect(() => {
    if (opened) {
      // console.log('Adding listener');
      const cb = (e: KeyboardEvent) => {
        e.stopPropagation();
        // e.preventDefault();
        // console.log(e);
        if (e.key == 'Escape')
          onClose();
      };
      const options: AddEventListenerOptions = {
        passive: true,
        once: true,
        capture: true,
      };
      window.addEventListener('keydown', cb, options);
      return () => {
        // console.log('Removing listener');
        window.removeEventListener('keydown', cb, options);
      };
    }
  }, [onClose, opened]);
}
