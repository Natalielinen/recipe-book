"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useLanguage } from "@/providers/LanguageProvider";

export const LanguageButton = () => {
    const { lang, setLang } = useLanguage();

    const router = useRouter();

    const onLangChange = () => {
        setLang(lang === "ru" ? "en" : "ru");

        router.refresh();
    };

    return (
        <Button
            variant="outline"
            onClick={onLangChange}
            aria-label="Toggle language"
        >
            {lang.toUpperCase()}
        </Button>
    );
};
