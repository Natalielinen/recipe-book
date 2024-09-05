'use client';

import { useCategoryStore } from "@/app/store/category";
import { useTranslation } from "../../app/i18n/client";
import { cn } from "../../lib/utils";
import { Category } from "@prisma/client";

interface Props {
    className?: string;
    lng: string;
    categories: Category[]
}


export const Categories: React.FC<Props> = ({ className, lng, categories }) => {

    const activeCategoryId = useCategoryStore((state) => state.activeId);

    const { t } = useTranslation(lng);

    return <div className={cn('inline-flex gap-1 bg-secondary p-1 rounded-2xl', className)}>
        {
            categories.map((category) => {
                return <a
                    key={category.id}
                    href={`#${t(category.nameKey)}`}
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        activeCategoryId === category.id && 'bg-background shadow-md shadow-shd text-primary'
                    )}
                >
                    <button>{t(category.nameKey)}</button>
                </a>
            })
        }
    </div>;
};