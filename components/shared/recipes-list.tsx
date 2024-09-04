'use client';

import React from "react";
import { Container } from "./container";
import { Api } from "@/app/services/api-client";
import { CategoryDto } from "@/app/services/dto/recipe.dto";
import { RecipesGroupList } from "./recipes-group-list";
import { useTranslation } from "@/app/i18n/client";

interface Props {
    lng: string;
}

export const RecipesList: React.FC<Props> = ({ lng }) => {

    const { t } = useTranslation(lng);

    const [categories, setCategories] = React.useState<CategoryDto[]>([]);
    const fetchRecipes = async () => {
        const response = await Api.recipes(lng);

        setCategories(response);
    };

    React.useEffect(() => {
        fetchRecipes();
    }, [])


    return <Container className="mt-10 pb-14">
        <div className="flex-1">
            <div className="flex flex-col gap-16">
                {
                    categories.length && categories.map((category) => (
                        <RecipesGroupList
                            key={category.id}
                            categoryId={category.id}
                            lng={lng}
                            recipes={category.recipes}
                            title={t(category.nameKey)}

                        />
                    ))
                }
            </div>
        </div>
    </Container>;
};