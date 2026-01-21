import { useTranslation } from "react-i18next"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header() {
    const { t: tHeader } = useTranslation('header')
    const { t: tCommon } = useTranslation('common')
    return (
        <header>
            <div>
                <h1>{tCommon('app.title')}</h1>
                <p>{tCommon('app.description')}</p>
            </div>
            <nav>
                <a href="/">{tHeader('navigation.home')}</a>
                <a href="/about">{tHeader('navigation.about')}</a>
                <a href="/contact">{tHeader('navigation.contact')}</a>
            </nav>
            <LanguageSwitcher />
        </header>
    )
}
