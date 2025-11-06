"use client";

import React from "react";
import { RecipeCard } from "./recipe-card";
import { Title } from "./title";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/app/store/category";
import { Recipe } from "@prisma/client";
import Image from "next/image";

interface Props {
    title: string;
    recipes: Recipe[];
    categoryId: number;
}

export const RecipesGroupList: React.FC<Props> = ({
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, intersection?.isIntersecting]);

    return (
        <div id={title} ref={intersectionRef}>
            <div className="flex justify-start gap-10 items-center mb-5">
                <Title text={title} size="lg" className="font-extrabold" />
                <Image
                    src={`/assets/images/categories/${categoryId}.png` || ""}
                    width={68}
                    height={48}
                    alt={title}
                    className="rounded-md"
                />
            </div>

            <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-10 mb-8">
                {recipes.map((recipe, i) => (
                    <RecipeCard
                        id={recipe.id}
                        key={recipe.id}
                        recipeName={recipe.recipeName}
                        imageUrl={recipe.imageUrl as string}
                        shortDescription={recipe.shortDescription}
                    />
                ))}
            </div>
        </div>
    );
};
