import { useTranslation } from "@/app/i18n";
import { RecipeContent } from "@/components/shared/recipe-content";
import { prisma } from "@/prisma/prisma-client";

export default async function RecipePage({ params: { lng, id } }: { params: { lng: string, id: string } }) {

    const { t } = await useTranslation(lng);
    const recipe = await prisma.recipe.findFirst({
        where: { id: Number(id) },
        include: {
            ingredients: true
        }
    });

    if (!recipe) return <div>{t("Рецепт не найден")}</div>;

    return <RecipeContent
        lng={lng}
        recipe={recipe}
    />

}