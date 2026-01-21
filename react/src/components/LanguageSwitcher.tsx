import { useTranslation } from "react-i18next"

/**
 * LanguageSwitcher Component
 * 
 * Provides UI controls for users to switch between different languages.
 * Uses react-i18next for internationalization (i18n) functionality.
 * Displays language options as buttons with flags and language names.
 */
export default function LanguageSwitcher() {

    // Hook to access i18n instance and translation function
    // 'common' namespace is used to fetch translations from common.json
    const { i18n, t } = useTranslation('common')

    // Array of available languages with their codes, translated names, and flag codes
    // The 'code' is used internally by i18n to identify the language
    // The 'name' is translated dynamically using the translation function
    // The 'flag' is a simple string identifier for display purposes (could be emojis or country codes)
    const languages = [
        { code: 'en', name: t('language.english'), flag: 'GB' },
        { code: 'fr', name: t('language.french'), flag: 'FR' },
        { code: 'es', name: t('language.spanish'), flag: 'ES' },
    ]

    return (
        <div>
            {/* Label for the language switcher section */}
            <label>{t('language.label')}</label>

            {/* Map through languages array to create a button for each language */}
            {languages.map(lang => (
                <button
                    // Unique key for React list rendering (must be unique among siblings)
                    key={lang.code}
                    // Add 'active' class if this language is currently selected
                    className={i18n.language === lang.code ? 'active' : ''}
                    // Handle language change when button is clicked
                    onClick={() => i18n.changeLanguage(lang.code)}>
                    {/* Display flag and language name */}
                    {lang.flag} {lang.name}
                </button>
            ))}
        </div>
    )
}
