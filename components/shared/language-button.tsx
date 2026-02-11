'use client';

import { Button } from "../ui/button";
import { useLanguage } from "@/providers/LanguageProvider";

export const LanguageButton = () => {
    const { lang, setLang } = useLanguage();

    const onLangChange = () => {
        setLang(lang === 'ru' ? 'en' : 'ru')
    };

    return (
        <Button variant="outline" onClick={onLangChange} aria-label="Toggle language">
            {lang.toUpperCase()}
        </Button>
    );
};