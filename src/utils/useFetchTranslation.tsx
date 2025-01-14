import React from 'react';
import Heading6 from '../components_small/typography/Heading6';
import {useENVContext} from '../context/ENVContext';
import constants from './constants_parameters';
import {emptyStringForEveryKey} from './emptyStringForEveryKey';
import {importLocalTransFile} from './importLocalTransFile';
import InlineTooltip from './InlineTooltip';

// const isLocalhost = () => false;// window.location.hostname == 'localhost';//
export const isLocalhost = (): boolean => (window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1') && !constants.isNative;//

export const useFetchTranslation = (
    file: 'admin' | 'client' | 'receptions' | 'orders' | 'cash-register-summary' | 'cash-register-settings' | 'notifications' | 'stock' | 'react-admin' | 'react-client',
    defaultValue = emptyStringForEveryKey,
    language: string | null = null,
) => {

    const [value, setValue] = React.useState(defaultValue);
    const baseURL = isLocalhost() ? 'https://assets-range.golferis.cz' : window.ASSETS_URL;

    const env = useENVContext();
    language ??= env.currentLanguage.urlCode;

    // uprava, pouziva se uz ted jen 2 typy - react-client a react-admin
    if (file === 'client') {
        file = 'react-client';
    } else if (file !== 'react-client') {
        file = 'react-admin';
    }

    const addTooltips = (translations: any) => {
        (Object.keys(translations) as (keyof typeof translations)[]).forEach((key, index) => {
            const helpKey = `help.${String(key)}`;
            if (translations[helpKey]) {
                translations[key] = <InlineTooltip
                    translation={translations[key]}
                    helpTranslation={translations[helpKey]}
                    heading={<Heading6
                        style={{ marginTop: 0, marginBottom: '24px' }}>{translations['modalHelp.title']}</Heading6>}
                />;
            }
        });
        return translations;
    };

    React.useEffect(() => {
        if (isLocalhost()) {
            importLocalTransFile(file, language!).then((s) => {
                setValue(
                    addTooltips(s),
                );
            });
        } else {
            const ac = new AbortController();
            const project = constants.project === 'other' ? 'tycko' : constants.project;

            Promise.allSettled([
                fetch(
                    `${baseURL}/i18n/react/${language}.${project}.${file}.json`,
                    {
                        mode: 'cors',
                        signal: ac.signal,
                    },
                ).then((res) => res.json()),
                importLocalTransFile(file, 'cs'),
                importLocalTransFile(file, language!),
            ]).then((results) => {
                console.log(results);
                const [serverTranslations, defaultLocalTranslations, localTranslations] = results
                    .map((r) => {
                        if (r.status != 'fulfilled') {
                            return {};
                        }
                        if (!r.value || typeof r.value != 'object') {
                            return {};
                        }
                        return r.value;
                    });
                setValue(
                    addTooltips({ ...defaultLocalTranslations, ...localTranslations, ...serverTranslations }),
                );
            });
            return () => ac?.abort?.();
        }
    }, [baseURL, file, language]);

    return [value, setValue] as const;
};
