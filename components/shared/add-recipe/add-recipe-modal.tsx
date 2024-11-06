'use client';

import { useRecipeStore } from "@/app/store/recipe";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AddRecipeForm } from "./add-recipe-form";
import { useTranslation } from "@/app/i18n/client";
import { RecipeDto } from "@/app/services/dto/recipe.dto";
import React from "react";
import { useMedia } from "react-use";

interface Props {
    className?: string;
    lng: string;
    isEditForm?: boolean;
    recipe?: RecipeDto;
}

export const AddRecipeModal: React.FC<Props> = ({ className, lng, recipe = {} as RecipeDto, isEditForm = false }) => {

    const { t } = useTranslation(lng);

    const { addRecipeModalOpen, setAddRecipeModalOpen } = useRecipeStore((state) => state);

    const isWide = useMedia('(min-width: 1024px)');

    return <Dialog open={addRecipeModalOpen} onOpenChange={() => setAddRecipeModalOpen(false)}>
        <DialogContent className={cn(
            "p-4 h-[90%] overscroll-y-contain overflow-auto",
            isWide ? 'max-w-[1060px]' : '',
            className)} >
            <DialogTitle>
                {
                    isEditForm ? t('Изменить рецепт') : t('Добавить рецепт')
                }
            </DialogTitle>

            <AddRecipeForm isEditForm={isEditForm} recipe={recipe} lng={lng} />
        </DialogContent>
    </Dialog>;
};
