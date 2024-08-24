import { useTranslation } from "@/app/i18n";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    lng: string;
}

export const LanguagesSwitcher: React.FC<Props> = async ({ className, lng }) => {
    const { t } = await useTranslation(lng);

    // Определяем следующий язык в зависимости от текущего языка
    let nextLang: string;

    if (lng === 'ru') {
        nextLang = 'en';
    } else if (lng === 'en') {
        nextLang = 'fr';
    } else if (lng === 'fr') {
        nextLang = 'ru';
    } else {
        // Если по какой-то причине lng не соответствует ни одному из языков,
        // по умолчанию устанавливаем следующий язык как 'ru'
        nextLang = 'ru';
    }

    return (
        <span className={cn("inline-block py-2 px-4 border-[1px] border-primary w-[fit-content] rounded-[12px] cursor-pointer", className)}>
            <Link href={`/${nextLang}`}>
                {t("Переключить на: ")}{nextLang}
            </Link>
        </span>
    );
};
