import { cn } from "../../lib/utils";

interface Props {
    className?: string
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
]

export const Categories: React.FC<Props> = ({ className }) => {
    return <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>

    </div>;
};