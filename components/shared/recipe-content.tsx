'use client';

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
    id: number;
}

export const RecipeContent: React.FC<Props> = ({ id }) => {

    const [showShoppingListModal, setShowShoppingListModal] = useState(false);

    const {
        setAddRecipeModalOpen,
        recipe,
        setRecipe,
        initialServings,
        setInitialServings

    } = useRecipeStore((state) => state);

    const fetchRecipe = async () => {
        const recipe = await Api.getRecipeById(id);
        setRecipe(recipe);

        setInitialServings(recipe.servings);

    }

    useEffect(() => {
        fetchRecipe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const router = useRouter();

    const onRecipeEdit = () => {
        setAddRecipeModalOpen(true);
    }

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

    console.log('recipe', recipe);


    return recipe ? (<Container className="flex flex-col my-10 gap-5">
        <Button onClick={() => router.push(`/recipes`)} type="button" className="w-[60px]">
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
                    <p className="font-bold">Порции</p>
                    <CountButton value={initialServings} onClick={onServingsChange} />
                </div>

                <div>
                    <Title text="Ингредиенты" size="md" className="mb-1 mt-2 font-bold" />
                    <ul style={{
                        columns: getColumnsCount(recipe.ingredients?.length || 0)
                    }}>
                        {
                            recipe.ingredients?.map((ingredient) => <IngredientListItem
                                key={ingredient.name}
                                amount={Number(calculateAmount(ingredient.amount))}
                                unit={ingredient.unit}
                                title={ingredient.name}
                                toTaste={ingredient.toTaste}
                            />)
                        }
                    </ul>
                </div>

            </div>

        </div>

        <div>
            <Title text={"Способ приготовления"} className="mb-1 font-bold" />
            <p>{recipe.fullDescription}</p>
        </div>

        <div>
            <TooltipButton
                tooltipContent={"Список покупок"}
                onButtonClick={() => setShowShoppingListModal(true)}
            >
                <ListCheck />
            </TooltipButton>

            <ShoppinListModal
                showShoppingListModal={showShoppingListModal}
                setShoppingListModal={setShowShoppingListModal}
                ingredientsList={recipe.ingredients?.map((ingredient) => ({
                    ...ingredient,
                    amount: Number(calculateAmount(ingredient.amount))
                }))}
            />

            <AddRecipeModal recipe={recipe as RecipeDto} isEditForm />
        </div>
    </Container>) : 'loading';

};
