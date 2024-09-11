import {
    Dialog,
    DialogContent,

} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { Ingredient } from "@prisma/client";
import { IngredientListItem } from "./ingredient-list-item";
import { Title } from "./title";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "../ui/button";

interface Props {
    className?: string;
    showShoppingListModal: boolean;
    setShoppingListModal: (value: boolean) => void;
    ingredientsList: Ingredient[];
    lng: string
}

export const ShoppinListModal: React.FC<Props> = ({
    className,
    showShoppingListModal,
    setShoppingListModal,
    ingredientsList,
    lng
}) => {

    const { t } = useTranslation(lng)

    return (
        <Dialog open={showShoppingListModal} onOpenChange={() => setShoppingListModal(false)}>
            <DialogContent className={cn("p-4 w-[800px] max-w-[1060px]", className)} >
                <div >
                    {
                        ingredientsList.map((ingredient) => (
                            <div key={ingredient.id} className="flex justify-between my-4">
                                <Title text={ingredient.name} size="sm" className="mb-1 mt-2 font-bold w-[150px]" />
                                <div className="flex gap-10 items-center w-[300px]">
                                    <Label
                                        htmlFor="email"
                                    >{t('У меня есть')}</Label>
                                    <Input
                                        type="number"
                                        id="inStock"
                                        className="w-20"
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

                <Button variant="outline">
                    {t("Сформировать список покупок")}
                </Button>

            </DialogContent>
        </Dialog>

    );
};