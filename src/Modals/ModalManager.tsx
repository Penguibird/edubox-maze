import React, { ReactNode, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Overlay from './Overlay';


// Props that all modals should have
interface IntrinsicModalProps<T> {
    opened: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    resolve?: (v: T) => void;
}

export type GetResolveTypeFromModalProps<T extends { resolve: any }> = Parameters<T['resolve']>[0] | boolean

// (T extends any // { resolve: (v: infer B) => void }
//   ?
//   : never);

export type ModalComponentType<T extends IntrinsicModalProps<any>> = React.FunctionComponent<T>

class ModalManager {
    /**
     * Opens a modal
     *
     * @param options Additional options
     * @param options.key If the key is a non empty string, the modal manager will guarantee only one modal with this key will ever be opened
     */
    static showModal: <T extends ModalComponentType<any>>(Modal: T, props?: Omit<React.ComponentProps<T>, keyof IntrinsicModalProps<any>>, options?: ShowModalOptions)
        => Promise<GetResolveTypeFromModalProps<React.ComponentProps<T>>>;
    // static hideLastModal: () => void;
    // static hideAllModals: (type?: React.FC<any>) => void;
    static Container: typeof Container;
}

interface ModalManagerProps {
    renderInAnimatePresence?: boolean
}

interface ShowModalOptions {
    key?: string;
}

let i = 0;

interface ModalsWithId {
    id: number,
    modal: ReactNode,
}

const Container = ({ renderInAnimatePresence, ...props }: ModalManagerProps) => {
    const [openedModals, setOpenedModals] = React.useState([] as ModalsWithId[]);
    const setterRef = useRef(setOpenedModals);
    setterRef.current = setOpenedModals;

    const openedModalKeys = useRef(new Set<string>());

    // React.useEffect(() => {
    //     console.log('ModalManagerContainer initialized', setterRef);
    // }, []);

    const _showModal = <T extends IntrinsicModalProps<ReturnVal>, ReturnVal>(
        ModalComponent: ModalComponentType<T>,
        props: Omit<T, keyof IntrinsicModalProps<ReturnVal>>,
        options?: ShowModalOptions,
    ) => {
        // console.log('Showing modal', ModalComponent);
        const id = i++;
        const key = options?.key;
        if (key) {
            if (openedModalKeys.current.has(key)) {
                return Promise.resolve();
            } else {
                openedModalKeys.current.add(key);
            }
        }
        const promise = new Promise<ReturnVal>(((resolve) => {
            const close = () => {
                if (key) {
                    openedModalKeys.current.delete(key);
                }
                return setterRef.current((m) => m.filter((_) => _.id != id));
            };
            setterRef.current((m) => [
                ...m,
                {
                    id,
                    // @ts-expect-error TS2322
                    modal: <ModalComponent
                        key={id}
                        onClose={() => {
                            resolve(false as ReturnVal);
                            close();
                        }}
                        onConfirm={() => {
                            resolve(true as ReturnVal);
                            close();
                        }}
                        resolve={(v: ReturnVal) => {
                            resolve(v);
                            close();
                        }}
                        opened
                        {...props}
                    />,
                },
            ]);
        }));

        return promise;
    };

    React.useEffect(() => {
        ModalManager.showModal = <T extends ModalComponentType<any>>(
            Modal: T,
            props?: Omit<React.ComponentProps<T>, keyof IntrinsicModalProps<any>>,
            options?: ShowModalOptions
        ) => {
            return _showModal<React.ComponentProps<T>, GetResolveTypeFromModalProps<React.ComponentProps<T>>>(Modal, props ?? ({} as any), options);
        };
        //  ModalManager.showModal = (key: string, props?:) => {
        //   setopenedModals(m => [...m, registeredModals[key]])
        //  }

    }, []);

    return <div {...props}>
        {openedModals.length > 0 && <Overlay />}
        {renderInAnimatePresence
            ? <AnimatePresence>
                {openedModals.map((_) => _.modal)}
            </AnimatePresence>
            : openedModals.map((_) => _.modal)
        }
    </div>;
};

ModalManager.Container = Container;

export default ModalManager;
