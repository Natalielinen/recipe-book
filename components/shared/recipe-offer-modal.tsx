import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React from "react";
import { useAction } from "next-safe-action/hooks";
import { getUserRecipes } from "@/server/actions/get-user-recipes";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { CheckCheck } from "lucide-react";
import { AddRecipeForm } from "./add-recipe";
import { FormProvider, useForm } from "react-hook-form";
import {
    AddRecipeFormValues,
    addRecipeSchema,
} from "@/schemas/add-recipe-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRecipeOfADay } from "@/server/actions/add-recipe-of-a-day";
import { RecipeDto } from "@/app/services/dto/recipe.dto";
import { useLanguage } from "@/providers/LanguageProvider";
import { Lang, translation } from "@/translation/translation";

interface RecipeOfferModalProps {
    open: boolean;
    handleClose: () => void;
}

export const RecipeOfferModal = ({
    open,
    handleClose,
}: RecipeOfferModalProps) => {
    const { data: session } = useSession();
    const { lang } = useLanguage();

    const [chosenOption, setChosenOption] = React.useState<
        ("add" | "select") | null
    >(null);
    const [recipesList, setRecipesList] = React.useState<RecipeDto[]>([]);
    const [selectedRecipeId, setSelectedRecipeId] = React.useState<number | null>(
        null,
    );

    const defaultFormValues = {
        categoryId: "1",
        recipeName: "",
        fullDescription: "",
        ingredients: [
            {
                name: "",
                amount: "1",
                unit: "шт",
                toTaste: false,
            },
        ],
        servings: "1",
        imageUrl: "",
    };

    const form = useForm<AddRecipeFormValues>({
        resolver: zodResolver(addRecipeSchema),
        defaultValues: defaultFormValues,
    });

    const closeModal = () => {
        setChosenOption(null);
        setSelectedRecipeId(null);
        handleClose();
    };

    const { execute: fetchUserRecipes, status: fetchRecipesStatus } = useAction(
        getUserRecipes,
        {
            onSuccess: (data) => {
                if (data?.data?.error) {
                    toast.error(data?.data?.error);
                }
                if (data?.data?.recipes) {
                    setChosenOption("select");
                    setRecipesList(data?.data?.recipes);
                }
            },
        },
    );

    const { execute: createRecipeOfTheDay, status: createRecipeOfTheDayStatus } =
        useAction(addRecipeOfADay, {
            onSuccess: (data) => {
                if (data?.data?.error) {
                    toast.error(data?.data?.error);
                }
                if (data?.data?.success) {
                    toast.success(data?.data?.success);
                    closeModal();
                }
            },
        });

    const onSubmit = async (data: AddRecipeFormValues) => {
        createRecipeOfTheDay(data);
    };

    const onSelectRecipe = async () => {
        const selectedRecipe = recipesList.find(
            (recipe) => recipe.id === selectedRecipeId,
        );
        if (selectedRecipe) {
            createRecipeOfTheDay({
                selectedRecipe: Boolean(selectedRecipeId),
                categoryId: selectedRecipe.categoryId.toString(),
                recipeName: selectedRecipe.recipeName,
                servings: selectedRecipe.servings.toString(),
                fullDescription: selectedRecipe.fullDescription,
                imageUrl: selectedRecipe.imageUrl || "",
                ingredients: selectedRecipe.ingredients.map((ingredient) => ({
                    name: ingredient.name,
                    amount: ingredient.amount.toString(),
                    unit: ingredient.unit,
                    toTaste: Boolean(ingredient.toTaste),
                    price: Number(ingredient.price),
                })),
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={closeModal}>
            <DialogContent className="w-[450px] max-h-[750px] bg-background p-10">
                {chosenOption === "select" && (
                    <div className="max-h-[550px] overflow-y-auto flex flex-col gap-4 py-3">
                        {recipesList.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="p-2 shadow-md rounded-md cursor-pointer flex justify-between items-center hover:opacity-50"
                                onClick={() => setSelectedRecipeId(recipe.id)}
                            >
                                {recipe.recipeName}
                                {selectedRecipeId === recipe.id && (
                                    <CheckCheck color="#22c55e" />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {chosenOption === "add" && (
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <div className="max-h-[550px] overflow-y-auto flex flex-col gap-4 p-3">
                                <AddRecipeForm />
                            </div>
                            <Button
                                type="submit"
                                loading={createRecipeOfTheDayStatus === "executing"}
                            >
                                {translation[lang as Lang].save}
                            </Button>
                        </form>
                    </FormProvider>
                )}

                {!chosenOption && (
                    <>
                        <Button onClick={() => setChosenOption("add")}>
                            {" "}
                            {translation[lang as Lang].createRecipe}
                        </Button>
                        <Button
                            onClick={() =>
                                fetchUserRecipes({
                                    userId: Number(session?.user?.id),
                                })
                            }
                            loading={fetchRecipesStatus === "executing"}
                        >
                            {" "}
                            {translation[lang as Lang].selectRecipe}
                        </Button>
                    </>
                )}
                {chosenOption === "select" && (
                    <DialogFooter>
                        <Button
                            className="w-full"
                            disabled={!selectedRecipeId}
                            onClick={onSelectRecipe}
                            loading={createRecipeOfTheDayStatus === "executing"}
                        >
                            {translation[lang as Lang].confirm}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};
