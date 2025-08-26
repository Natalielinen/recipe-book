import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React from "react";
import { useAction } from "next-safe-action/hooks";
import { getUserRecipes } from "@/server/actions/get-user-recipes";
import toast from "react-hot-toast";
import { Recipe } from "@prisma/client";
import { useSession } from "next-auth/react";
import { CheckCheck } from "lucide-react";
import { AddRecipeForm, AddUserRecipe } from "./add-recipe";
import { FormProvider, useForm } from "react-hook-form";
import { AddRecipeFormValues, addRecipeSchema } from "@/schemas/add-recipe-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRecipeOfADay } from "@/server/actions/add-recipe-of-a-day";


interface RecipeOfferModalProps {
    open: boolean;
    handleClose: () => void;
}

export const RecipeOfferModal = ({ open, handleClose }: RecipeOfferModalProps) => {

    const { data: session } = useSession()

    const [chosenOption, setChosenOption] = React.useState<("add" | "select") | null>(null);
    const [recipesList, setRecipesList] = React.useState<Recipe[]>([]);
    const [selectedRecipeId, setSelectedRecipeId] = React.useState<number | null>(null);

    const defaultFormValues = {
        categoryId: '1',
        recipeName: '',
        fullDescription: '',
        ingredients: [{
            name: '',
            amount: '1',
            unit: 'шт',
            toTaste: false
        }],
        servings: '1',
        imageUrl: '',
    };

    const form = useForm<AddRecipeFormValues>({
        resolver: zodResolver(addRecipeSchema),
        defaultValues: defaultFormValues,
    });

    const { execute: fetchUserRecipes, status: fetchRecipesStatus } = useAction(getUserRecipes, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.recipes) {
                setChosenOption("select");
                setRecipesList(data?.data?.recipes);
            }
        },

    });

    const { execute: createRecipeOfTheDay, status: createRecipeOfTheDayStatus } = useAction(addRecipeOfADay, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.success) {
                toast.success(data?.data?.success);
                handleClose();
            }
        },

    });

    const closeModal = () => {
        setChosenOption(null);
        setSelectedRecipeId(null);
        handleClose();
    };

    const onSubmit = async (data: AddRecipeFormValues) => {
        createRecipeOfTheDay(data);
    }

    return (
        <Dialog open={open} onOpenChange={closeModal}>
            <DialogContent className="w-[450px] max-h-[750px] bg-background p-10">
                {
                    chosenOption === "select" &&
                    <div className="max-h-[550px] overflow-y-auto flex flex-col gap-4 py-3">
                        {
                            recipesList.map((recipe) => (
                                <div
                                    key={recipe.id}
                                    className="p-2 shadow-md rounded-md cursor-pointer flex justify-between items-center hover:opacity-50"
                                    onClick={() => setSelectedRecipeId(recipe.id)}
                                >
                                    {recipe.recipeName}
                                    {selectedRecipeId === recipe.id && <CheckCheck color="#22c55e" />}
                                </div>
                            ))
                        }
                    </div>
                }

                {
                    chosenOption === "add" && <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                            <div className="max-h-[550px] overflow-y-auto flex flex-col gap-4 p-3">
                                <AddRecipeForm />
                            </div>
                            <Button
                                type='submit'
                                loading={createRecipeOfTheDayStatus === 'executing'}
                            >
                                Сохранить
                            </Button>

                        </form>
                    </FormProvider>
                }

                {
                    !chosenOption &&
                    <>
                        <Button onClick={() => setChosenOption("add")}> Создать рецепт</Button>
                        <Button
                            onClick={() => fetchUserRecipes({
                                userId: Number(session?.user?.id)
                            })}
                            loading={fetchRecipesStatus === 'executing'}
                        > Выбрать рецепт</Button>
                    </>
                }
                {
                    chosenOption === "select" && <DialogFooter>
                        <Button className="w-full" disabled={!selectedRecipeId}>
                            Подтвердить
                        </Button>
                    </DialogFooter>
                }

            </DialogContent>

        </Dialog>
    )
}