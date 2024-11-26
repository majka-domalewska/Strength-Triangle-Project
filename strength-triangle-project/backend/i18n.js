import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next) // Pass i18n instance to react-i18next.
    .init({
        debug: true,
        fallbackLng: 'en', // Default language.
        interpolation: {
            escapeValue: false, // React handles escaping.
        },
        resources: {
            en: {
                translation: {
                    welcome_message: "Welcome to our app!",
                    description: "This is a React Native app with language support.",
                },
            },
            nl: {
                translation: {
                    welcome_message: "Welkom bij onze app!",
                    description: "Dit is een React Native-app met taalondersteuning.",
                },
            },
        },
    });

export default i18n;