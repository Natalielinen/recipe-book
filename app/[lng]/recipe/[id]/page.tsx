import { useTranslation } from "@/app/i18n";
import { RecipeContent } from "@/components/shared/recipe-content";

export default async function RecipePage({ params: { lng, id } }: { params: { lng: string, id: string } }) {

    const { t } = await useTranslation(lng);

    return <RecipeContent
        lng={lng}
        id={Number(id)}
    />

}