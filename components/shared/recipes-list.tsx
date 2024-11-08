'use client';

import React from "react";
import { Container } from "./container";
import { Api } from "@/app/services/api-client";
import { RecipesGroupList } from "./recipes-group-list";
import { useCategoryStore } from "@/app/store/category";


export const RecipesList = () => {

    const { categories, setCategories } = useCategoryStore((state) => state);
    const fetchRecipes = async () => {
        const response = await Api.recipes();

        setCategories(response);
    };

    React.useEffect(() => {
        fetchRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return <Container className="mt-10 pb-14">
        <div className="flex-1">
            <div className="flex flex-col gap-16">
                {
                    Boolean(categories.length) && categories.map((category) => (
                        Boolean(category.recipes.length) &&
                        <RecipesGroupList
                            key={category.id}
                            categoryId={category.id}
                            recipes={category.recipes}
                            title={category.nameKey}

                        />
                    ))

                }
            </div>
        </div>
    </Container>;
};
