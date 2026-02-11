"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setCookie } from "@/lib/cookie";

interface LanguageContextType {
    lang: string;
    setLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "ru",
    setLang: () => { },
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({
    initialLang,
    children,
}: {
    initialLang: string;
    children: React.ReactNode;
}) {
    const [lang, setLangState] = useState(initialLang);

    const persistLang = (value: string) => {
        localStorage.setItem("lang", value);
        setCookie("lang", value);
    };

    const setLang = (newLang: string) => {
        setLangState(newLang);
        persistLang(newLang);
    };

    useEffect(() => {
        const lsLang = localStorage.getItem("lang");

        if (lsLang) {
            // localStorage есть → используем его
            if (lsLang !== lang) {
                setLangState(lsLang);
            }
        } else {
            // ❗ первый запуск → сохраняем initialLang
            persistLang(lang);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}
