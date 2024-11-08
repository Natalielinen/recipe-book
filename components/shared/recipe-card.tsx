'use client';

import Link from "next/link";
import { cn } from "../../lib/utils";
import { Title } from "./title";
import { Button } from "../ui/button";
import { RecipeImage } from "./recipe-image";

interface Props {
    id: number;
    recipeName: string;
    imageUrl?: string;
    shortDescription?: string;
    className?: string;
}

export const RecipeCard: React.FC<Props> = ({
    id,
    recipeName,
    imageUrl,
    shortDescription,
    className,
}) => {

    return <div className={cn('flex flex-col justify-between', className)}>
        <div>
            <RecipeImage imageUrl={imageUrl as string} recipeName={recipeName} />

            <Title text={recipeName} size="sm" className="mb-1 mt-3 font-bold" />

            <p className="text-sm text-gray-400">
                {shortDescription || ''}
            </p>
        </div>


        <Link href={`recipe/${id}`}>
            <Button variant="outline" className="w-full mt-4">Подробнее...</Button>
        </Link>
    </div>;
};