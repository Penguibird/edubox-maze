import { AppInfo } from '@capacitor/app';

const constants = {
  maxPeoplePerFlight: 4,
  isTycko: Boolean(import.meta.env.VITE_IS_TYCKO) || Boolean(String(import.meta.env.VITE_APP_TYPE) == 'kiosek'),
  project: String(import.meta.env.VITE_PROJECT) as 'skga' | 'tycko' | 'panorama' | 'other',
  showDebug: Boolean(import.meta.env.VITE_SHOW_DEBUG),
  appType: String(import.meta.env.VITE_APP_TYPE),
  isBackend: String(import.meta.env.VITE_APP_TYPE) === 'reception' && window.location.pathname.indexOf('/client') === -1,
  isNative: String(import.meta.env.VITE_APP_TYPE) === 'mobile',
  isKiosek: String(import.meta.env.VITE_APP_TYPE) === 'kiosek',
  appInfo: {
    version: '1.0.16',
    build: '',
    name: '',
    id: ''
  } as AppInfo,
  defaultCountryId: () => {
    return constants.project === 'skga' ? 189 : 56;
  },
  appInfoHeader: {
    os: 'unknown',
    project: String(import.meta.env.VITE_PROJECT),
    version: '1.0.40',
    appLanguage: String(import.meta.env.VITE_PROJECT) === 'skga' ? 'sk' : 'cs'
  }
};

export default constants;
