import { useTranslation } from "@/app/i18n";
import { Container, RecipeImage, Title } from "@/components/shared";
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

    return <Container className="flex flex-col my-10 gap-5">
        <div className="flex flex-1 gap-10">
            <RecipeImage imageUrl={recipe.imageUrl} recipeName={recipe.recipeName} />
            <div>
                <Title text={recipe.recipeName} size="lg" className="mb-1 mt-3 font-bold" />


                <p>{t("Порции")} {recipe.servings}</p>


                <ul>
                    {
                        recipe.ingredients.map((ingredient) => <li key={ingredient.id}>{ingredient.name}</li>)
                    }
                </ul>


            </div>



        </div>

        <div>
            <Title text={t("Способ приготовления")} className="mb-1 font-bold" />
            <p>{recipe.fullDescription}</p>
        </div>


    </Container>;
}