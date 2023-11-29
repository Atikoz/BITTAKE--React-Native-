import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './json/english.json';
import russian from './json/russian.json';

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: english,
            ru: russian,
        },
        lng: 'en', // язык по умолчанию
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;
