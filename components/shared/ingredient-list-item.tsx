import { useLanguage } from "@/providers/LanguageProvider";
import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Lang, translation } from "@/translation/translation";

interface Props {
    className?: string;
    title?: React.ReactNode;
    amount: number;
    unit: string;
    toTaste?: boolean;
    loading?: boolean;
}

export const IngredientListItem: React.FC<Props> = ({
    className,
    title,
    amount,
    unit,
    toTaste,
    loading,
}) => {
    const { lang } = useLanguage();
    return loading ? (
        <Skeleton className="w-[240px] h-[30px] rounded-2xl mb-1" />
    ) : (
        <li className={cn("flex", className)}>
            <span className={cn("flex flex-1 text-lg text-neutral-500")}>
                {title}
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
            </span>
            {toTaste ? (
                translation[lang as Lang].toTaste
            ) : (
                <span className="font-bold text-lg">
                    {amount} {unit}
                </span>
            )}
        </li>
    );
};
