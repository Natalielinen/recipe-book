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
}

export const RecipesGroupList: React.FC<Props> = ({
    className,
    listClassName,
    title,
    recipes,
    categoryId,
}) => {
    const setActiveId = useCategoryStore((state) => state.setActiveId);

    const setMenuOpen = useCategoryStore((state) => state.setMenuOpen);

    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveId(categoryId);
            setMenuOpen(false);
        }

    }, [categoryId, intersection?.isIntersecting]);

    return <div className={cn('', className)} id={title} ref={intersectionRef}>

        <Title text={title} size="lg" className="font-extrabold mb-5" />

        <div className={cn('grid gap-[5%] grid-cols-[repeat(auto-fill,minmax(250px,1fr))]', listClassName)}>

            {
                recipes.map((recipe, i) => (
                    <RecipeCard
                        id={recipe.id}
                        key={recipe.id}
                        recipeName={recipe.recipeName}
                        imageUrl={recipe.imageUrl as string}
                        shortDescription={recipe.shortDescription}
                    />
                ))
            }
        </div>
    </div>;
};