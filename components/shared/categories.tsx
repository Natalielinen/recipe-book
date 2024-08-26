'use client';

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

const activeIndex = 1;

export const Categories: React.FC<Props> = ({ className, lng }) => {

    const { t } = useTranslation(lng)
    return <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
        {
            categories.map((category) => {
                return <a
                    key={category.id}
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        activeIndex === category.id && 'bg-white shadow-nd shadow-gray-200 text-primary'
                    )}
                >
                    <button>{t(category.nameKey)}</button>
                </a>
            })
        }
    </div>;
};