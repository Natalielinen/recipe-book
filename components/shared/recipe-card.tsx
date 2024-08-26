'use client';

import Link from "next/link";
import { cn } from "../../lib/utils";
import { Soup } from "lucide-react";
import { Title } from "./title";
import { Button } from "../ui/button";
import { useTranslation } from "../../app/i18n/client";

interface Props {
    id: number;
    recipeName: string;
    imageUrl?: string;
    shortDescription?: string;
    className?: string;
    lng: string;
}

export const RecipeCard: React.FC<Props> = ({
    id,
    recipeName,
    imageUrl,
    shortDescription,
    className,
    lng
}) => {

    const { t } = useTranslation(lng)

    return <div className={cn('', className)}>

        <Link href={`/recipe/${id}`}>
            <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                {
                    imageUrl ?
                        <img className="w-[215px] h-[215px]" src={imageUrl} alt={recipeName} />
                        : <Soup size={215} className="text-gray-400" />
                }

            </div>

            <Title text={recipeName} size="sm" className="mb-1 mt-3 font-bold" />

            <p className="text-sm text-gray-400">
                {shortDescription || ''}
            </p>

            <Button variant="outline" className="w-full mt-4">{t('Подробнее...')}</Button>
        </Link>
    </div>;
};