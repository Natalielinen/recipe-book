'use client';

import React from "react";
import { cn } from "../../lib/utils";
import { RecipeCard } from "./recipe-card";
import { Title } from "./title";
import { useIntersection } from 'react-use';
import { useCategoryStore } from "@/app/store/category";
import { Recipe } from "@prisma/client";

interface Props {
    title: string;
    recipes: Recipe[];
    listClassName?: string;
    categoryId: number;
    className?: string;
    lng: string;
}

export const RecipesGroupList: React.FC<Props> = ({
    className,
    listClassName,
    title,
    recipes,
    categoryId,
    lng
}) => {
    const setActiveId = useCategoryStore((state) => state.setActiveId);

    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveId(categoryId);
        }

    }, [categoryId, intersection?.isIntersecting]);

    return <div className={cn('', className)} id={title} ref={intersectionRef}>

        <Title text={title} size="lg" className="font-extrabold mb-5" />

        <div className={cn('grid grid-cols-4 gap-[50px]', listClassName)}>

            {
                recipes.map((recipe, i) => (
                    <RecipeCard
                        id={recipe.id}
                        key={recipe.id}
                        recipeName={recipe.recipeName}
                        imageUrl={recipe.imageUrl}
                        shortDescription={recipe.shortDescription}
                        lng={lng}
                    />
                ))
            }
        </div>
    </div>;
};