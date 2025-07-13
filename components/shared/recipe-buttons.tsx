import { ListCheck, Trash2 } from "lucide-react";
import { TooltipButton } from "./tooltip-button";
import React from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFRecipe } from "./recipe-pdf";

interface RecipeButtonsProps {
    setShowShoppingListModal: (value: boolean) => void;
    setShowConfirmDeleteModal: (value: boolean) => void;
    recipeTitle: string;
    recipeImage: string;
    ingredients: string[];
    description: string;
}

export const RecipeButtons: React.FC<RecipeButtonsProps> = ({
    setShowShoppingListModal,
    setShowConfirmDeleteModal,
    recipeTitle,
    recipeImage,
    ingredients,
    description
}) => {

    return <div className="flex justify-between">
        <div className="flex gap-2">
            <TooltipButton
                tooltipContent="Список покупок"
                onButtonClick={() => setShowShoppingListModal(true)}
            >
                <ListCheck />
            </TooltipButton>

            <TooltipButton
                tooltipContent="Сохранить в PDF"
            >
                <PDFDownloadLink document={<PDFRecipe
                    title={recipeTitle}
                    description={description}
                    imageUrl={recipeImage}
                    ingredients={ingredients}
                />
                } fileName={`${recipeTitle}.pdf`}>
                    {({ loading }) => (loading ? '...' : 'PDF')}
                </PDFDownloadLink>
            </TooltipButton>

        </div>
        <div>
            <TooltipButton
                tooltipContent="Удалить рецепт"
                onButtonClick={() => setShowConfirmDeleteModal(true)}
                buttonVariant="destructive"
            >
                <Trash2
                    color="white"
                />
            </TooltipButton>
        </div>
    </div>
};