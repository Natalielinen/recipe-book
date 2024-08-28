'use client';

import { useCategoryStore } from "@/app/store/category";
import { useTranslation } from "../../app/i18n/client";
import { cn } from "../../lib/utils";

interface Props {
    className?: string;
    lng: string;
}

const categories = [
    {
        id: 1,
        nameKey: "Салаты и закуски",
    },
    {
        id: 2,
        nameKey: "Первые блюда",
    },
    {
        id: 3,
        nameKey: "Горячие блюда",
    },
    {
        id: 4,
        nameKey: "Выпечка",
    },
    {
        id: 5,
        nameKey: "Десерты и напитки",
    },
    {
        id: 6,
        nameKey: "Домашние заготовки",
    }
];


export const Categories: React.FC<Props> = ({ className, lng }) => {

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