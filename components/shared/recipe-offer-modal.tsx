import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import React from "react";
import { useAction } from "next-safe-action/hooks";
import { getUserRecipes } from "@/server/actions/get-user-recipes";
import toast from "react-hot-toast";
import { Recipe } from "@prisma/client";
import { useSession } from "next-auth/react";
import { CheckCheck } from "lucide-react";


interface RecipeOfferModalProps {
    open: boolean;
    handleClose: () => void;
}

export const RecipeOfferModal = ({ open, handleClose }: RecipeOfferModalProps) => {

    const { data: session } = useSession()

    const [optionChosen, setOptionChosen] = React.useState(false);
    const [recipesList, setRecipesList] = React.useState<Recipe[]>([]);
    const [selectedRecipeId, setSelectedRecipeId] = React.useState<number | null>(null);

    const { execute: fetchUserRecipes, status: fetchRecipesStatus } = useAction(getUserRecipes, {
        onSuccess: (data) => {
            if (data?.data?.error) {
                toast.error(data?.data?.error);
            }
            if (data?.data?.recipes) {
                setOptionChosen(true);
                setRecipesList(data?.data?.recipes);
            }
        },

    });

    const closeModal = () => {
        setOptionChosen(false);
        setSelectedRecipeId(null);
        handleClose();
    };

    return (
        <Dialog open={open} onOpenChange={closeModal}>
            <DialogContent className="w-[450px] max-h-[750px] bg-background p-10">
                {
                    optionChosen &&
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
                    !optionChosen &&
                    <>
                        <Button> Создать рецепт</Button>
                        <Button
                            onClick={() => fetchUserRecipes({
                                userId: Number(session?.user?.id)
                            })}
                            loading={fetchRecipesStatus === 'executing'}
                        > Выбрать рецепт</Button>
                    </>
                }
                {
                    optionChosen && <DialogFooter>
                        <Button className="w-full" disabled={!selectedRecipeId}>
                            Подтвердить
                        </Button>
                    </DialogFooter>
                }

            </DialogContent>

        </Dialog>
    )
}