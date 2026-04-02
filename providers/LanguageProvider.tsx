'use client';

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

function getCookie(name: string) {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

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
        const cookieLang = getCookie("lang");
        const lsLang = typeof window !== "undefined" ? localStorage.getItem("lang") : null;

        if (cookieLang) {
            if (cookieLang !== lang) setLangState(cookieLang);
        } else if (lsLang) {
            if (lsLang !== lang) setLangState(lsLang);
            persistLang(lsLang);
        } else {
            // ни cookie, ни localStorage нет → ставим initialLang
            persistLang(lang);
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}