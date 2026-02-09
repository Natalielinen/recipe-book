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

    const setLang = (newLang: string) => {
        setLangState(newLang);
        localStorage.setItem("lang", newLang);
        setCookie("lang", newLang);
    };

    useEffect(() => {
        const lsLang = localStorage.getItem("lang");
        if (lsLang && lsLang !== lang) {
            setLangState(lsLang);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}