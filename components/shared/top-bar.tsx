'use client';

import { Plus } from "lucide-react";
import { useTranslation } from "../../app/i18n/client";
import { Button } from "../ui/button";
import { Categories } from "./categories";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Category } from "@prisma/client";
import { useRecipeStore } from "@/app/store/recipe";
import { useMedia } from "react-use";

interface Props {
    lng: string;
    className?: string;
    categories: Category[]
}

export const TopBar: React.FC<Props> = ({ lng, className, categories }) => {

    const { setAddRecipeModalOpen } = useRecipeStore((state) => state);

    const onRecipeAdd = () => {
        setAddRecipeModalOpen(true);
    }

    const isWide = useMedia('(min-width: 1024px)');

    const { t } = useTranslation(lng)
    return <div className={cn('sticky top-0 bg-background py-5 shadow-lg shadow-black/5 z-10', className)}>
        <Container className={cn("flex justify-between", isWide ? 'items-center' : '')}>
            <Categories lng={lng} categories={categories} />
            <Button variant="outline" onClick={onRecipeAdd} className="">
                {
                    isWide && t("Добавить рецепт")
                }
                <Plus size={16} className={cn(isWide ? 'ml-2' : '')} />
            </Button>
        </Container>


    </div>
};