'use client';

import { useTranslation } from "@/app/i18n/client";
import { Container } from "./container";
import { CountButton } from "./count-button";
import { RecipeImage } from "./recipe-image";
import { Title } from "./title";
import { useEffect, useState } from "react";
import { IngredientListItem } from "./ingredient-list-item";
import { Button } from "../ui/button";
import { ListCheck, MoveLeft, Pencil } from "lucide-react";
import { TooltipButton } from "./tooltip-button";
import { ShoppinListModal } from "./shopping-list-modal";
import { useRecipeStore } from "@/app/store/recipe";
import { AddRecipeModal } from "./add-recipe";
import { useRouter } from 'next/navigation';
import { Api } from "@/app/services/api-client";
import { RecipeDto } from "@/app/services/dto/recipe.dto";

interface Props {
    lng: string;
    id: number;
}

export const RecipeContent: React.FC<Props> = ({ id, lng }) => {

    const [showShoppingListModal, setShowShoppingListModal] = useState(false);

    const {
        setAddRecipeModalOpen,
        recipe,
        setRecipe,
        initialServings,
        setInitialServings

    } = useRecipeStore((state) => state);

    const fetchRecipe = async () => {
        const recipe = await Api.getRecipeById(lng, id);
        setRecipe(recipe);

        setInitialServings(recipe.servings);

    }

    useEffect(() => {
        fetchRecipe();

    }, [])

    const router = useRouter();

    const onRecipeEdit = () => {
        setAddRecipeModalOpen(true);
    }

    const { t } = useTranslation(lng);

    const onServingsChange = (type: 'plus' | 'minus') => {

        if (type === 'plus') {
            setInitialServings(initialServings + 1);
        } else {
            setInitialServings(initialServings - 1);
        }
    }

    const calculateAmount = (amount: number) => {
        return ((amount / recipe.servings) * initialServings).toFixed(2);
    }

    const getColumnsCount = (length: number): number => {
        if (length >= 5 && length < 15) {
            return 2;
        } else if (length >= 15) {
            return 3;
        }
        return 1;
    }

    return recipe ? (<Container className="flex flex-col my-10 gap-5">
        <Button onClick={() => router.push(`/${lng}/recipes`)} type="button" className="w-[60px]">
            <MoveLeft size={16} />
        </Button>
        <div className="flex flex-1 gap-10 flex-wrap">
            <RecipeImage imageUrl={recipe.imageUrl as string} recipeName={recipe.recipeName} />
            <div>
                <div className="flex gap-10 items-center">
                    <Title text={recipe.recipeName} size="lg" className="mb-1 mt-3 font-bold" />
                    <Button variant="outline" onClick={onRecipeEdit}>
                        <Pencil />
                    </Button>

                </div>

                <div className="flex gap-10 items-center">
                    <p className="font-bold">{t("Порции")}</p>
                    <CountButton value={initialServings} onClick={onServingsChange} />
                </div>

                <div>
                    <Title text={t("Ингредиенты")} size="md" className="mb-1 mt-2 font-bold" />
                    <ul style={{
                        columns: getColumnsCount(recipe.ingredients?.length || 0)
                    }}>
                        {
                            recipe.ingredients?.map((ingredient) => <IngredientListItem
                                key={ingredient.name}
                                amount={Number(calculateAmount(ingredient.amount))}
                                unit={ingredient.unit}
                                title={ingredient.name}
                            />)
                        }
                    </ul>
                </div>

            </div>

        </div>

        <div>
            <Title text={t("Способ приготовления")} className="mb-1 font-bold" />
            <p>{recipe.fullDescription}</p>
        </div>

        <div>
            <TooltipButton
                tooltipContent={t("Список покупок")}
                onButtonClick={() => setShowShoppingListModal(true)}
            >
                <ListCheck />
            </TooltipButton>

            <ShoppinListModal
                lng={lng}
                showShoppingListModal={showShoppingListModal}
                setShoppingListModal={setShowShoppingListModal}
                ingredientsList={recipe.ingredients?.map((ingredient) => ({
                    ...ingredient,
                    amount: Number(calculateAmount(ingredient.amount))
                }))}
            />

            <AddRecipeModal lng={lng} recipe={recipe as RecipeDto} isEditForm />
        </div>
    </Container>) : 'loading';

};
