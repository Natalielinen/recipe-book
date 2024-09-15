'use client';

import { useRecipeStore } from "@/app/store/recipe";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AddRecipeForm } from "./add-recipe-form";
import { useTranslation } from "@/app/i18n/client";

interface Props {
    className?: string;
    lng: string;
}

export const AddRecipeModal: React.FC<Props> = ({ className, lng }) => {

    const { t } = useTranslation(lng)


    const { addRecipeModalOpen, setAddRecipeModalOpen, isEditForm } = useRecipeStore((state) => state);

    return <Dialog open={addRecipeModalOpen} onOpenChange={() => setAddRecipeModalOpen(false)}>
        <DialogContent className={cn("p-4 w-[800px] max-w-[1060px]", className)} >
            <DialogTitle>
                {
                    isEditForm ? t('Изменить рецепт') : t('Добавить рецепт')
                }
            </DialogTitle>

            <AddRecipeForm isEditForm={isEditForm} />
        </DialogContent>
    </Dialog>;
};