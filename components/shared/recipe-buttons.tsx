import { ListCheck, Trash2 } from "lucide-react";
import { TooltipButton } from "./tooltip-button";
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFRecipe } from "./recipe-pdf";
import { useLanguage } from "@/providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

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
    description,
}) => {
    const { lang } = useLanguage();

    return (
        <div className="flex justify-between">
            <div className="flex gap-2">
                <TooltipButton
                    tooltipContent={translation[lang as Lang].shoppingList}
                    onButtonClick={() => setShowShoppingListModal(true)}
                >
                    <ListCheck />
                </TooltipButton>

                <TooltipButton tooltipContent={translation[lang as Lang].savePDF}>
                    <PDFDownloadLink
                        document={
                            <PDFRecipe
                                title={recipeTitle}
                                description={description}
                                imageUrl={recipeImage}
                                ingredients={ingredients}
                                lang={lang}
                            />
                        }
                        fileName={`${recipeTitle}.pdf`}
                    >
                        {({ loading }) => (loading ? "..." : "PDF")}
                    </PDFDownloadLink>
                </TooltipButton>
            </div>
            <div>
                <TooltipButton
                    tooltipContent={translation[lang as Lang].deleteRecipe}
                    onButtonClick={() => setShowConfirmDeleteModal(true)}
                    buttonVariant="destructive"
                >
                    <Trash2 color="white" />
                </TooltipButton>
            </div>
        </div>
    );
};
