'use client';

import { useTranslation } from "@/app/i18n/client";
import { Container } from "./container";
import { CountButton } from "./count-button";
import { RecipeImage } from "./recipe-image";
import { Title } from "./title";
import { RecipeDto } from "@/app/services/dto/recipe.dto";
import { useState } from "react";
import { IngredientListItem } from "./ingredient-list-item";
import { Button } from "../ui/button";
import { ListCheck, Pencil } from "lucide-react";
import { TooltipButton } from "./tooltip-button";
import { ShoppinListModal } from "./shopping-list-modal";

interface Props {
    recipe: RecipeDto;
    lng: string;
}

export const RecipeContent: React.FC<Props> = ({ recipe, lng }) => {

    const [initialServings, setInitialServings] = useState(recipe.servings);
    const [showShoppingListModal, setShowShoppingListModal] = useState(false);

    const { t } = useTranslation(lng);

    const onServingsChange = (type: 'plus' | 'minus') => {

        if (type === 'plus') {
            setInitialServings(initialServings + 1);
        } else {
            setInitialServings(initialServings - 1);
        }
    }

    const calculateAmount = (amount: number) => {
        return Math.floor((amount / recipe.servings) * initialServings);
    }

    return <Container className="flex flex-col my-10 gap-5">
        <div className="flex flex-1 gap-10">
            <RecipeImage imageUrl={recipe.imageUrl} recipeName={recipe.recipeName} />
            <div>
                <div className="flex gap-10 items-center">
                    <Title text={recipe.recipeName} size="lg" className="mb-1 mt-3 font-bold" />
                    <Button variant="outline">
                        <Pencil />
                    </Button>

                </div>


                <div className="flex gap-10 items-center">
                    <p className="font-bold">{t("Порции")}</p>
                    <CountButton value={initialServings} onClick={onServingsChange} />
                </div>

                <div>
                    <Title text={t("Ингредиенты")} size="md" className="mb-1 mt-2 font-bold" />
                    <div>
                        {
                            recipe.ingredients.map((ingredient) => <IngredientListItem
                                key={ingredient.id}
                                amount={calculateAmount(ingredient.amount)}
                                unit={ingredient.unit}
                                title={ingredient.name}
                            />)
                        }
                    </div>
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
                ingredientsList={recipe.ingredients.map((ingredient) => ({
                    ...ingredient,
                    amount: calculateAmount(ingredient.amount)
                }))}
            />
        </div>


    </Container>;


};