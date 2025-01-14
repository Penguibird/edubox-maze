export async function importLocalTransFile(file: string, language: string) {
    console.warn('Detecting localhost, loading translation files from file', file);

    let i;
    let path;
    i = import.meta.glob('../../../../clubs/common/www/i18n/react/*.json', {as: 'raw'});
    if (Object.keys(i).length) {
        path = `../../../../clubs/common/www/i18n/react/cs.${file}.json`;
    } else {
        console.warn('Could not load generated translation files, loading originals instead.');
        i = import.meta.glob('../../../../i18n/react/*.json', {as: 'raw'});
        path = `../../../../i18n/react/${language}.${file}.json`;
    }

    const stringContent: any = await i[path]();
    return (JSON.parse(stringContent));
}
