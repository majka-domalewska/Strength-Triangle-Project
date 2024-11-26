import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getAnswers, getOutcomes } from './dataController';


async function setupI18n() {
    const { answersEn, answersNl } = await getAnswers();
    const { outcomesEn, outcomesNl } = await getOutcomes();

    i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en', // Default language
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    answers_en: answersEn,
                    outcomes_en: outcomesEn,
                }
            },
            nl: {
                translation: {
                    answers_nl: answersNl,
                    outcomes_nl: outcomesNl,
                },
            },
        },
    });
}

setupI18n();

export default i18n;