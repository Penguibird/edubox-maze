import { isLocalhost } from './useFetchTranslation';

export const isClient = () => (isLocalhost()
  ? window.location.pathname.includes('client')
  : Boolean(import.meta.env.VITE_APP_TYPE == 'club'));
