import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslations from '../public/ar.json';
import heTranslations from '../public/he.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: arTranslations },
      he: { translation: heTranslations }
    },
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;