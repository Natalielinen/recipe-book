'use client';

import React from "react";
import { Container } from "./container";
import { Api } from "@/app/services/api-client";
import { RecipesGroupList } from "./recipes-group-list";
import { useCategoryStore } from "@/app/store/category";
import { Skeleton } from "../ui/skeleton";


export const RecipesList = () => {

    const { categories, setCategories } = useCategoryStore((state) => state);

    const [loading, setLoading] = React.useState(false);

    const fetchRecipes = async () => {
        setLoading(true);
        const response = await Api.recipes();

        setCategories(response);

        setLoading(false);
    };

    React.useEffect(() => {
        fetchRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return <Container className="mt-10 pb-14">
        {
            loading
                ? <div className="flex gap-16">
                    {
                        ['', '', '', ''].map((el, idx) => <Skeleton key={idx} className="w-[272px] h-[257px] rounded-2xl mb-1" />)
                    }
                </div>
                : <div className="flex-1">
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

        }



    </Container>;
};
