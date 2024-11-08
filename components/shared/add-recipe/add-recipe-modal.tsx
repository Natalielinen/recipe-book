'use client';

import { useRecipeStore } from "@/app/store/recipe";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AddRecipeForm } from "./add-recipe-form";
import { RecipeDto } from "@/app/services/dto/recipe.dto";
import React from "react";
import { useMedia } from "react-use";

interface Props {
    className?: string;
    isEditForm?: boolean;
    recipe?: RecipeDto;
}

export const AddRecipeModal: React.FC<Props> = ({ className, recipe = {} as RecipeDto, isEditForm = false }) => {

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

            <AddRecipeForm isEditForm={isEditForm} recipe={recipe} />
        </DialogContent>
    </Dialog>;
};
