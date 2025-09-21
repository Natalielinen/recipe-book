'use client';

import { useRecipeStore } from "@/app/store/recipe";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AddUserRecipe } from "./add-user-recipe";
import { RecipeDto } from "@/app/services/dto/recipe.dto";
import React, { FC } from "react";
import { useMedia } from "react-use";

interface AddRecipeModalProps {
    className?: string;
    isEditForm?: boolean;
    recipe?: RecipeDto;
}

export const AddRecipeModal: FC<AddRecipeModalProps> = ({ className, recipe = {} as RecipeDto, isEditForm = false }) => {

    const { addRecipeModalOpen, setAddRecipeModalOpen } = useRecipeStore((state) => state);

    const isWide = useMedia('(min-width: 1024px)');

    return <Dialog open={addRecipeModalOpen} onOpenChange={() => setAddRecipeModalOpen(false)}>
        <DialogContent className={cn(
            "p-4 h-[90%] overscroll-y-contain overflow-auto",
            isWide ? 'max-w-[1060px]' : '',
            className)} >
            <DialogTitle>
                {
                    isEditForm ? 'Изменить рецепт' : 'Добавить рецепт'
                }
            </DialogTitle>
            <AddUserRecipe isEditForm={isEditForm} recipe={recipe} />
        </DialogContent>
    </Dialog>;
};
