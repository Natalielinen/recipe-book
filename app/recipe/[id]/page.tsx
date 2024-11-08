import { authOptions } from "@/app/constants/auth-options";
import { RecipeContent } from "@/components/shared/recipe-content";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RecipePage({ params: { id } }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/');
    }

    return <RecipeContent
        id={Number(id)}
    />

}