import { RecipeContent } from "@/components/shared/recipe-content";

export default async function RecipePage({ params: { lng, id } }: { params: { lng: string, id: string } }) {

    return <RecipeContent
        lng={lng}
        id={Number(id)}
    />

}