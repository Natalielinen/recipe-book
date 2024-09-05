'use client';

import { useTranslation } from "../../app/i18n/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    className?: string;
    lng: string;
}

export const LanguagesSwitcher: React.FC<Props> = ({ className, lng }) => {
    const { t } = useTranslation(lng);
    const router = useRouter();

    const [selectedLanguage, setSelectedLanguage] = useState(lng);

    const onLangChange = (value: string) => {
        setSelectedLanguage(value);

        //TODO: при переключении языка на странице рецепта перекидывает на главную

        router.push(`/${value}`)
    }

    const langOptions = [
        {
            label: "Русский",
            value: "ru",
        },
        {
            label: "English",
            value: "en",
        },
        {
            label: "Français",
            value: "fr",
        },
    ];

    return (
        <Select onValueChange={onLangChange} defaultValue={selectedLanguage}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={t("Язык")} />
            </SelectTrigger>
            <SelectContent>
                {
                    langOptions.map((lang) => <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>)
                }
            </SelectContent>
        </Select>
    );
};
