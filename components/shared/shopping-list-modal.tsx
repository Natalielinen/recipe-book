'use client';

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "../ui/button";
import React from "react";
import saveAs from "file-saver";
import { FormRecipe } from "@/app/services/dto/recipe.dto";

interface Props {
    className?: string;
    showShoppingListModal: boolean;
    setShoppingListModal: (value: boolean) => void;
    ingredientsList: FormRecipe['ingredients'];
    lng: string
}

type InStock = {
    id: number;
    value: number;
}

export const ShoppinListModal: React.FC<Props> = ({
    className,
    showShoppingListModal,
    setShoppingListModal,
    ingredientsList,
    lng
}) => {

    const { t } = useTranslation(lng)

    const [inStockValues, setInStockValues] = React.useState<InStock[]>([])

    const handleInStockChange = (id: number, value: number) => {
        setInStockValues((prevValues) => {
            const index = prevValues.findIndex((value) => value.id === id);
            if (index !== -1) {
                const newValues = [...prevValues];
                newValues[index] = { id, value };
                return newValues;
            } else {
                return [...prevValues, { id, value }];
            }
        });
    };

    const cresteTextList = () => {

        const textList = ingredientsList?.map((ingredient) => {
            const amount = ingredient.amount - (inStockValues.find((value) => value.id === ingredient.id)?.value || 0);

            if (amount > 0) {
                return `${ingredient.name} - ${ingredient.amount - (inStockValues.find((value) => value.id === ingredient.id)?.value || 0)} ${ingredient.unit} \n`;
            }

            return "";

        })

        const blob = new Blob(textList, { type: "text/plain;charset=utf-8" });
        saveAs(blob, "shopping-list.txt");

        setShoppingListModal(false);
        setInStockValues([]);
    }


    return (
        <Dialog open={showShoppingListModal} onOpenChange={() => setShoppingListModal(false)}>
            <DialogContent className={cn("p-4 w-[800px] max-w-[1060px] h-[720px] overscroll-y-contain overflow-auto", className)} >
                <div >
                    {
                        ingredientsList?.map((ingredient) => (
                            <div key={ingredient.name} className="flex justify-between my-4">
                                <p className="mb-1 mt-2 font-bold w-[150px]">{ingredient.name}</p>
                                <div className="flex gap-10 items-center w-[300px]">
                                    <Label
                                        htmlFor="email"
                                    >{t('У меня есть')}</Label>
                                    <Input
                                        type="number"
                                        id="inStock"
                                        className="w-20"
                                        value={inStockValues.find((value) => value.id === ingredient.id)?.value}
                                        onChange={(e) => handleInStockChange(ingredient.id as number, parseInt(e.target.value))}
                                    />
                                    <p className="p-0 m-0">{ingredient.unit}</p>

                                </div>

                                <div className="flex gap-10 items-center w-[210px]">
                                    <p className="p-0 m-0">{t("Мне нужно")}</p>
                                    <p className="p-0 m-0 font-bold">{ingredient.amount} {ingredient.unit}</p>
                                </div>

                            </div>
                        ))
                    }
                </div>

                <Button variant="outline" onClick={cresteTextList}>
                    {t("Сформировать список покупок")}
                </Button>

            </DialogContent>
        </Dialog>

    );
};